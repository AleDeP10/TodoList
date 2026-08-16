"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast as baseToast, ToastContainer } from "react-toastify";
import { selectToast, clearToast } from "@/store/ui/uiSlice";
import { getCSSVariable } from "@/lib/utils/getCSSVariable";
import "react-toastify/dist/ReactToastify.css";
import { Icons } from "@/lib/components/Icons";

const icons = {
  startup: Icons.startup,
  success: Icons.confirm,
  error: Icons.cancel,
  delete: Icons.delete,
};

const ToastManager = () => {
  const dispatch = useDispatch();
  const toastPayload = useSelector(selectToast);

  useEffect(() => {
    if (toastPayload) {
      const { type, message } = toastPayload;

      const fallbackColors = {
        startup: getCSSVariable("--warning-bg"),
        success: getCSSVariable("--success-bg"),
        error: getCSSVariable("--error-bg"),
        delete: getCSSVariable("--delete-bg"),
      };

      const backgroundColor = toastPayload.color ?? fallbackColors[type];
      const icon = toastPayload.icon ?? icons[type];

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

export default ToastManager;
