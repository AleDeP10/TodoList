import { toast as baseToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ICONS = {
  startup: <span style={{ fontSize: "1.2rem" }}>🚀</span>,
  success: <span style={{ fontSize: "1.2rem" }}>✅</span>,
  error: <span style={{ fontSize: "1.2rem" }}>❌</span>,
  delete: <span style={{ fontSize: "1.2rem" }}>🗑️</span>,
};

const COLORS = {
  startup: "#f5a623",
  success: "#2ecc71",
  error: "#e74c3c",
  delete: "#f5a623",
};

type ToastType = keyof typeof ICONS;

const toast = {
  show: (type: ToastType, message: string) =>
    baseToast(message, {
      position: "bottom-right",
      style: { backgroundColor: COLORS[type], color: "#fff" },
      icon: ICONS[type],
    }),

  // Shortcut methods
  startup: (msg: string) => toast.show("startup", msg),
  success: (msg: string) => toast.show("success", msg),
  error: (msg: string) => toast.show("error", msg),
  delete: (msg: string) => toast.show("delete", msg),
};

export { toast };