window.openModal = function (modalId) {
  const modalEl = document.getElementById(modalId);
  if (!modalEl) return;

  // Imposta inert su tutto tranne la modale
  document
    .querySelectorAll("body > *:not(#" + modalId + "):not(script)")
    .forEach((el) => {
      if (!el.hasAttribute("inert")) el.setAttribute("inert", "");
    });

  bootstrap.Modal.getOrCreateInstance(modalEl).show();
};

window.closeModal = function (modalId) {
  // ✅ Rimuovi focus prima che aria-hidden venga applicato
  document.activeElement?.blur();

  const modalEl = document.getElementById(modalId);
  if (!modalEl) return;

  bootstrap.Modal.getOrCreateInstance(modalEl).hide();

  // ✅ Rimuovi `inert` da eventuali elementi bloccati
  document
    .querySelectorAll("[inert]")
    .forEach((el) => el.removeAttribute("inert"));
};
