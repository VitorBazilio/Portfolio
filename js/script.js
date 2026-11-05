import initTheme from "./modules/theme.js";
import initNav from "./modules/nav.js";
import initReveal from "./modules/reveal.js";
import initTyping from "./modules/typing.js";
import initProjectFilter from "./modules/project-filter.js";
import initGithubRepos from "./modules/github-repos.js";
import initCopy from "./modules/copy.js";

initTheme();
initNav();
initReveal();
initTyping();
initProjectFilter();
initGithubRepos("VitorBazilio");
initCopy();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
