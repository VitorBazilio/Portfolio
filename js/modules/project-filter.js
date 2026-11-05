// Filtra os cards de projeto pela tecnologia escolhida.
export default function initProjectFilter() {
  const group = document.querySelector("[data-filters]");
  const projects = document.querySelectorAll("[data-projects] [data-tags]");
  if (!group || !projects.length) return;

  const buttons = group.querySelectorAll("[data-filter]");

  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    const filter = button.dataset.filter;

    buttons.forEach((btn) => {
      const active = btn === button;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    projects.forEach((project) => {
      const tags = project.dataset.tags.split(" ");
      const visible = filter === "all" || tags.includes(filter);
      project.hidden = !visible;
      if (visible) project.classList.add("is-visible");
    });
  });
}
