import { cva, type VariantProps } from "class-variance-authority";
import { CircleXIcon, type LucideIcon as LucideIconType } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon, type LucideIconProps } from "./lucide-icon";

const errorPlugVariants = cva(
  "group/error-plug flex gap-1 justify-center items-center flex-col",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border border-neutral-3",
      },
      size: {
        sm: "p-6 rounded-4",
        base: "p-8 rounded-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  },
);

type ErrorPlugProps = ComponentProps<"div"> &
  VariantProps<typeof errorPlugVariants>;

type ErrorPlugIconProps = Omit<LucideIconProps, "icon"> & {
  icon?: LucideIconType;
};

type ErrorPlugTitleProps = ComponentProps<"div">;

type ErrorPlugDescriptionProps = ComponentProps<"div">;

export function ErrorPlug({
  variant,
  size = "base",
  className,
  ...props
}: ErrorPlugProps) {
  return (
    <div
      data-slot="error-plug"
      data-size={size}
      className={cn(errorPlugVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export function ErrorPlugIcon({
  icon = CircleXIcon,
  className,
  ...props
}: ErrorPlugIconProps) {
  return (
    <LucideIcon
      data-slot="error-plug-icon"
      icon={icon}
      className={cn(
        "stroke-negative-5 group-data-[size=base]/error-plug:size-10 group-data-[size=sm]/error-plug:size-8",
        className,
      )}
      {...props}
    />
  );
}

export function ErrorPlugTitle({ className, ...props }: ErrorPlugTitleProps) {
  return (
    <div
      data-slot="error-plug-title"
      className={cn(
        "font-medium group-data-[size=base]/error-plug:text-xl group-data-[size=base]/error-plug:font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export function ErrorPlugDescription({
  className,
  ...props
}: ErrorPlugDescriptionProps) {
  return (
    <div
      data-slot="error-plug-description"
      className={cn(
        "text-neutral-6 group-data-[size=sm]/error-plug:text-sm",
        className,
      )}
      {...props}
    />
  );
}
