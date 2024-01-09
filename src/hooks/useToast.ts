"use client";
import { notification } from "antd";
import { useEffect } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

const useToast = () => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    return () => {
      notification.destroy();
    };
  }, []);

  return { showNotification, contextHolder };
};

export default useToast;
