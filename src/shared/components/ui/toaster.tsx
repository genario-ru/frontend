"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckIcon, CircleXIcon, InfoIcon } from "lucide-react";
// import { useTheme } from "next-themes";
import { type ComponentProps } from "react";
import { Toaster as ToasterRoot } from "sonner";

const toastIconVariants = cva(
  "p-1 ring-4 w-fit h-fit rounded-full [&_svg]:size-4",
  {
    variants: {
      variant: {
        info: "bg-neutral-5 ring-neutral-3 [&_svg]:stroke-neutral-8",
        success: "bg-positive-5 ring-positive-3 [&_svg]:stroke-positive-7",
        error: "bg-negative-5 ring-negative-3 [&_svg]:stroke-negative-7",
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
      className="bg-neutral-2 flex gap-3 rounded-xl border p-4 shadow-xs"
    >
      <div className={toastIconVariants({ variant })}>
        {variant === "info" && <InfoIcon />}
        {variant === "success" && <CircleCheckIcon />}
        {variant === "error" && <CircleXIcon />}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-neutral-8 font-medium">{title}</p>
        {description && (
          <p className="text-neutral-7 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
};

export const Toaster = ({ ...props }: ToasterProps) => {
  // const { theme = "system" } = useTheme();

  return (
    <ToasterRoot
      // theme={theme as ToasterProps["theme"]}
      position="top-center"
      toastOptions={{ unstyled: true, className: "w-full" }}
      className="toaster group w-full"
      {...props}
    />
  );
};
