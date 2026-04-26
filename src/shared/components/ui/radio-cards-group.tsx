import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const radioCardsGroupItemVariants = cva(
  cn(
    "flex flex-col items-center font-medium ring ring-neutral-4 bg-neutral-1 duration-200 [&_svg]:stroke-neutral-7 [&_svg]:shrink-0 [&_svg]:size-6 hover:ring-neutral-5 active:ring-neutral-5 data-[state=checked]:ring-neutral-8 data-[state=checked]:ring-2 data-[state=checked]:[&_svg]:stroke-neutral-8",
  ),
  {
    variants: {
      size: {
        sm: "gap-1 rounded-xl px-3 py-2",
        base: "gap-1 rounded-2xl p-3.5",
        lg: "gap-1.5 rounded-3xl p-4",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

type RadioCardsGroupItemProps = ComponentProps<
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
  className,
  children,
  size,
  ...props
}: RadioCardsGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(radioCardsGroupItemVariants({ size }), className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
