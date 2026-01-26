import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const emptyPlugVariants = cva("group/empty-plug flex flex-col", {
  variants: {
    variant: {
      default: "",
      filled: "bg-neutral-2",
    },
    size: {
      sm: "gap-2",
      base: "gap-4",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      size: "sm",
      className: "p-2",
    },
    {
      variant: "filled",
      size: "base",
      className: "p-4",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

type EmptyPlugProps = ComponentProps<"div"> &
  VariantProps<typeof emptyPlugVariants>;

export function EmptyPlug({
  variant,
  size,
  className,
  ...props
}: EmptyPlugProps) {
  return (
    <div
      data-slot="empty-plug"
      data-size={size}
      className={cn(emptyPlugVariants({ variant, size, className }))}
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
      className={cn(
        "flex max-w-sm flex-col items-center gap-1 group-[data-size=sm]/empty-plug:gap-2",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyPlugTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-plug-title"
      className={cn(
        "font-medium group-[data-size=base]/empty-plug:text-lg",
        className,
      )}
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
      className={cn(
        "text-neutral-6 group-[data-size=base]/empty-plug:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm items-center group-[data-size=sm]/empty-plug:text-sm",
        className,
      )}
      {...props}
    />
  );
}
