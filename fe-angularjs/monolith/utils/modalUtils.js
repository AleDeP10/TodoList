window.openModal = function (modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;

  el.classList.remove("d-none");
  el.setAttribute("aria-hidden", "false");

  // Lock background if needed
  document.body.setAttribute("aria-hidden", "true");
};

window.closeModal = function (modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;

  el.classList.add("d-none");
  el.setAttribute("aria-hidden", "true");

  // Unlock background
  document.body.removeAttribute("aria-hidden");
};
