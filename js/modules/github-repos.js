// Busca os repositórios atualizados mais recentemente na API pública do GitHub.
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4f5d95",
  "C#": "#178600",
  Python: "#3572a5",
};

const CACHE_KEY = "gh-repos";
const CACHE_TTL = 1000 * 60 * 60; // 1 hora: evita estourar o limite da API

const dateFormat = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" });

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.time < CACHE_TTL) return cached.data;
  } catch {
    /* sem cache */
  }
  return null;
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data }));
  } catch {
    /* ignora */
  }
}

function createRepoItem(repo) {
  const li = document.createElement("li");
  li.className = "repo";

  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener";

  const name = document.createElement("span");
  name.className = "repo__name";
  name.textContent = repo.name;

  const desc = document.createElement("p");
  desc.className = "repo__desc";
  desc.textContent = repo.description || "Sem descrição.";

  const meta = document.createElement("p");
  meta.className = "repo__meta";

  if (repo.language) {
    const lang = document.createElement("span");
    lang.className = "repo__lang";
    lang.textContent = repo.language;
    lang.style.setProperty("--lang", LANG_COLORS[repo.language] || "currentColor");
    meta.append(lang);
  }

  const updated = document.createElement("span");
  updated.textContent = `atualizado ${dateFormat.format(new Date(repo.pushed_at))}`;
  meta.append(updated);

  link.append(name, desc, meta);
  li.append(link);
  return li;
}

export default async function initGithubRepos(user, limit = 3) {
  const list = document.querySelector("[data-repos]");
  if (!list) return;

  try {
    let repos = readCache();

    if (!repos) {
      const response = await fetch(
        `https://api.github.com/users/${user}/repos?sort=pushed&per_page=30`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      repos = await response.json();
      writeCache(repos);
    }

    const visible = repos
      .filter((repo) => !repo.fork && repo.name.toLowerCase() !== user.toLowerCase())
      .slice(0, limit);

    if (!visible.length) throw new Error("Nenhum repositório público");

    list.replaceChildren(...visible.map(createRepoItem));
  } catch (error) {
    console.warn(error);
    const fallback = document.createElement("li");
    fallback.className = "repos__fallback";
    fallback.innerHTML =
      'Não foi possível carregar os repositórios agora. <a class="link" href="https://github.com/' +
      encodeURIComponent(user) +
      '" target="_blank" rel="noopener">Veja direto no GitHub ↗</a>';
    list.replaceChildren(fallback);
  }
}
