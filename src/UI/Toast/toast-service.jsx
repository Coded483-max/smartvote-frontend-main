import { toast } from "react-toastify";

// Enhanced toast service that works with your design system
export class ToastService {
  static defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  static success(message, options = {}) {
    return toast.success(message, {
      ...this.defaultOptions,
      ...options,
    });
  }

  static error(message, options = {}) {
    return toast.error(message, {
      ...this.defaultOptions,
      autoClose: 7000, // Longer for errors
      ...options,
    });
  }

  static info(message, options = {}) {
    return toast.info(message, {
      ...this.defaultOptions,
      position: "top-center",
      ...options,
    });
  }

  static warning(message, options = {}) {
    return toast.warning(message, {
      ...this.defaultOptions,
      autoClose: 6000,
      ...options,
    });
  }

  static loading(message, options = {}) {
    return toast.loading(message, {
      ...this.defaultOptions,
      autoClose: false,
      ...options,
    });
  }

  static promise(promise, messages, options = {}) {
    return toast.promise(promise, messages, {
      ...this.defaultOptions,
      position: "top-center",
      ...options,
    });
  }

  static update(toastId, options) {
    toast.update(toastId, options);
  }

  static dismiss(toastId) {
    toast.dismiss(toastId);
  }

  static dismissAll() {
    toast.dismiss();
  }
}

// Usage examples:
// ToastService.success("Operation completed!")
// ToastService.error("Something went wrong")
// const loadingToast = ToastService.loading("Processing...")
// ToastService.update(loadingToast, { render: "Done!", type: "success", isLoading: false })
