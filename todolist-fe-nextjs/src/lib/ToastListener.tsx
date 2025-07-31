"use client"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast as baseToast, ToastContainer } from "react-toastify";
import { selectToast, clearToast } from "@/store/ui";
import "react-toastify/dist/ReactToastify.css";

// 🎨 Costanti locali per stile e icona
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

const ToastListener = () => {
  const dispatch = useDispatch();
  const toastPayload = useSelector(selectToast);

  useEffect(() => {
    if (toastPayload) {
      const { type, message } = toastPayload;

      const backgroundColor = toastPayload.color ?? COLORS[type];
      const icon = toastPayload.icon ?? ICONS[type];

      baseToast(message, {
        position: "bottom-right",
        style: {
          backgroundColor,
          color: "#fff",
        },
        icon,
      });

      dispatch(clearToast());
    }
  }, [toastPayload, dispatch]);

  return <ToastContainer />;
};

export default ToastListener;
