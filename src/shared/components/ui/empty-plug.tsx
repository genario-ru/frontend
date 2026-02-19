import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon as LucideIconType, WindIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon, type LucideIconProps } from "./lucide-icon";

const emptyPlugVariants = cva(
  "group/empty-plug w-full flex items-center max p-4 justify-center flex-col",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border border-neutral-3 rounded-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EmptyPlugProps = ComponentProps<"div"> &
  VariantProps<typeof emptyPlugVariants>;

type EmptyPlugIconProps = Omit<LucideIconProps, "icon"> & {
  icon?: LucideIconType;
};

export function EmptyPlug({ variant, className, ...props }: EmptyPlugProps) {
  return (
    <div
      data-slot="empty-plug"
      className={cn(emptyPlugVariants({ variant }), className)}
      {...props}
    />
  );
}

export function EmptyPlugHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-plug-header"
      className={cn("flex max-w-sm flex-col items-center", className)}
      {...props}
    />
  );
}

export function EmptyPlugTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-plug-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

export function EmptyPlugIcon({
  icon = WindIcon,
  className,
  ...props
}: EmptyPlugIconProps) {
  return (
    <LucideIcon
      data-slot="empty-plug-icon"
      icon={icon}
      className={cn("size-8", className)}
      {...props}
    />
  );
}
export function EmptyPlugDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-plug-description"
      className={cn("text-neutral-6 text-center text-sm", className)}
      {...props}
    />
  );
}

export function EmptyPlugContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-plug-content"
      className={cn("flex w-full max-w-sm items-center", className)}
      {...props}
    />
  );
}
