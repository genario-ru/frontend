import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const radioCardsGroupItemVariants = cva(
  cn(
    "flex items-center font-medium bg-neutral-1 ring ring-neutral-4 duration-200 hover:bg-neutral-2",
    "disabled:cursor-not-allowed disabled:text-neutral-6 disabled:opacity-60 disabled:pointer-events-none disabled:hover:bg-neutral-1",
    "data-disabled:cursor-not-allowed data-disabled:text-neutral-6 data-disabled:opacity-60 data-disabled:pointer-events-none data-disabled:hover:bg-neutral-1",
  ),
  {
    variants: {
      size: {
        sm: "gap-1 rounded-xl px-3 py-2",
        base: "gap-2 rounded-2xl p-3.5",
        lg: "gap-3 rounded-3xl p-4",
      },
      align: {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
      state: {
        default:
          "hover:ring-neutral-5 active:ring-neutral-5 data-[state=checked]:ring-neutral-8 data-[state=checked]:ring-2",
        error: "ring-2 ring-negative-6",
      },
    },
    defaultVariants: {
      size: "base",
      align: "center",
      state: "default",
    },
  },
);

export type RadioCardsGroupItemProps = ComponentProps<
  typeof RadioGroupPrimitive.Item
> &
  VariantProps<typeof radioCardsGroupItemVariants>;

export function RadioCardsGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

export function RadioCardsGroupItem({
  size,
  align,
  state,
  className,
  children,
  ...props
}: RadioCardsGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        radioCardsGroupItemVariants({ size, align, state }),
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
