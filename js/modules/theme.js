// Alterna entre tema claro e escuro, lembrando a escolha do visitante.
export default function initTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  const root = document.documentElement;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

  const currentTheme = () => root.dataset.theme || (prefersLight.matches ? "light" : "dark");

  function updateLabel() {
    const next = currentTheme() === "dark" ? "claro" : "escuro";
    button.setAttribute("aria-label", `Ativar tema ${next}`);
  }

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* armazenamento indisponível (ex.: modo privado) */
    }
    updateLabel();
  });

  prefersLight.addEventListener("change", updateLabel);
  updateLabel();
}
