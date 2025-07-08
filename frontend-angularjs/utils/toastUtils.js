window.showToast = (message, type = "success") => {
  const toastId = "t" + Date.now();

  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${type} border-0`;
  toast.id = toastId;
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;

  const container =
    document.getElementById("toastArea") ||
    (() => {
      const el = document.createElement("div");
      el.className =
        "toast-container position-fixed bottom-0 start-0 p-3";
      el.id = "toastArea";
      document.body.appendChild(el);
      return el;
    })();

  container.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
  bsToast.show();

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
};
