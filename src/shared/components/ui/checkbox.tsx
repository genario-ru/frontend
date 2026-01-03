import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { checkboxIconVariants } from "@/shared/constants/checkbox-icon-variants";
import { cn } from "@/shared/utils/cn";

const checkboxVariants = cva(
  cn(
    "bg-neutral-1 border-neutral-6 shrink-0 border outline-none",
    "hover:bg-neutral-3",
    "focus-visible:ring-neutral-8 focus-visible:ring-2",
    "data-[state=checked]:border-neutral-8 data-[state=checked]:bg-neutral-8",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  {
    variants: {
      size: {
        sm: "h-5 w-5 rounded-md",
        base: "h-6 w-6 rounded-lg",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

export const Checkbox = ({ size, className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(checkboxVariants({ size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex h-full w-full items-center justify-center">
      <CheckIcon className={checkboxIconVariants({ size })} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
