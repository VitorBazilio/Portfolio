// Copia o e-mail para a área de transferência e mostra um aviso.
export default function initCopy() {
  const toast = document.querySelector("[data-toast]");
  let timer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        showToast("E-mail copiado!");
      } catch {
        showToast(button.dataset.copy);
      }
    });
  });
}
