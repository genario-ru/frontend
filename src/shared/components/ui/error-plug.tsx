import { cva, type VariantProps } from "class-variance-authority";
import { CircleXIcon, type LucideIcon as LucideIconType } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon, type LucideIconProps } from "./lucide-icon";

const errorPlugVariants = cva(
  "group/error-plug flex justify-center items-center",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border border-neutral-3 rounded-4",
      },
      direction: {
        column: "flex-col gap-1",
        row: "flex-row gap-2",
      },
    },
    compoundVariants: [
      {
        direction: "row",
        className: "py-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      direction: "column",
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
  direction,
  className,
  ...props
}: ErrorPlugProps) {
  return (
    <div
      data-slot="error-plug"
      data-direction={direction}
      className={cn(errorPlugVariants({ variant, direction }), className)}
      {...props}
    />
  );
}

export function ErrorPlugHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="error-plug-header"
      className={cn("flex max-w-sm flex-col items-center", className)}
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
      className={cn("stroke-negative-5 size-8", className)}
      {...props}
    />
  );
}

export function ErrorPlugTitle({ className, ...props }: ErrorPlugTitleProps) {
  return (
    <div
      data-slot="error-plug-title"
      className={cn("font-medium", className)}
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
        "text-neutral-6 text-center text-sm leading-tight",
        className,
      )}
      {...props}
    />
  );
}

export function ErrorPlugContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="error-plug-content"
      className={cn("flex w-full max-w-sm items-center", className)}
      {...props}
    />
  );
}
