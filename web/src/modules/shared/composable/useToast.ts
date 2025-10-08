import { readonly, ref } from "vue";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  timeout?: number;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  function showToast(message: string, type: ToastType = "info", timeout = 3000) {
    const id = Date.now();
    toasts.value.push({ id, message, type, timeout });

    setTimeout(() => removeToast(id), timeout);
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return {
    showToast,
    removeToast,
    toasts: readonly(toasts),
  };
}
