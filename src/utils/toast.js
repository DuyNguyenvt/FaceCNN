import { toast } from "react-toastify";

export const toastLux = (message) =>
  toast(message, {
    className: "toast-lux--background",
    bodyClassName: "toast-lux--font",
  });
