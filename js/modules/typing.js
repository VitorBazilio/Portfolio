// Efeito de digitação que alterna entre frases.
const PHRASES = [
  "interfaces responsivas",
  "APIs RESTful com .NET",
  "sistemas completos",
  "dashboards para negócios",
];

const TYPE_DELAY = 70;
const DELETE_DELAY = 35;
const HOLD_DELAY = 1800;

export default function initTyping() {
  const target = document.querySelector("[data-typing]");
  if (!target) return;

  // Respeita quem prefere menos movimento: mantém o texto estático.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let phraseIndex = 0;
  let charIndex = PHRASES[0].length;
  let deleting = true;

  function tick() {
    const phrase = PHRASES[phraseIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? DELETE_DELAY : TYPE_DELAY;

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = HOLD_DELAY;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
      delay = 300;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, HOLD_DELAY);
}
