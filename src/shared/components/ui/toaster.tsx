import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { type ComponentProps } from "react";
import { Toaster as ToasterRoot } from "sonner";

import { cn } from "@/shared/utils/cn";

const toastIconVariants = cva(
  cn(
    "p-1.5 w-fit h-fit rounded-full",
    "[&_svg]:stroke-neutral-1 dark:[&_svg]:stroke-neutral-8 [&_svg]:size-4 [&_svg]:stroke-3",
  ),
  {
    variants: {
      variant: {
        info: "bg-neutral-5",
        success: "bg-positive-5",
        warning: "bg-warning-5",
        error: "bg-negative-5",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

type ToasterProps = ComponentProps<typeof ToasterRoot>;

export type ToastProps = VariantProps<typeof toastIconVariants> & {
  id: string | number;
  title: string;
  description?: string;
};

export const Toast = (props: ToastProps) => {
  const { id, variant, title, description } = props;

  return (
    <div
      id={String(id)}
      className="bg-neutral-8 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xs"
    >
      <div className={toastIconVariants({ variant })}>
        {variant === "info" && <InfoIcon />}
        {variant === "success" && <CheckIcon />}
        {variant === "warning" && <TriangleAlertIcon />}
        {variant === "error" && <XIcon />}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-neutral-1 font-medium">{title}</p>
        {description && <p className="text-neutral-2 text-sm">{description}</p>}
      </div>
    </div>
  );
};

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <ToasterRoot
      position="top-center"
      toastOptions={{ unstyled: true, className: "w-full" }}
      className="toaster group w-full"
      {...props}
    />
  );
};
