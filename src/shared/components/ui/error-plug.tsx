import { cva, type VariantProps } from "class-variance-authority";
import { CircleXIcon, type LucideIcon as LucideIconType } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon, type LucideIconProps } from "./lucide-icon";

const errorPlugVariants = cva(
  "group/error-plug flex justify-center items-center flex-col",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border border-neutral-3",
      },
      size: {
        sm: "gap-2 p-6 rounded-4",
        base: "gap-4 p-8 rounded-6",
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
  size,
  className,
  ...props
}: ErrorPlugProps) {
  return (
    <div
      data-slot="error-plug"
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
      color="negative"
      className={cn(
        "group-[data-size=base]/error-plug:size-12 group-[data-size=sm]/error-plug:size-9",
        "group-[data-size=base]/error-plug:stroke-4 group-[data-size=sm]/error-plug:stroke-3",
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
        "font-medium group-[data-size=base]/error-plug:text-xl group-[data-size=base]/error-plug:font-semibold",
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
        "text-neutral-6 group-[data-size=sm]/error-plug:text-sm",
        className,
      )}
      {...props}
    />
  );
}
