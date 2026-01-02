import { toast as toastRoot } from "sonner";

import { Toast, type ToastProps } from "../components/ui/toaster";

export function toast(toast: Omit<ToastProps, "id">) {
  return toastRoot.custom((id) => <Toast id={id} {...toast} />);
}
