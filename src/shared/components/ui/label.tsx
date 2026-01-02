"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const labelVariants = cva(
  "w-fit h-fit flex items-center gap-2 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        sm: "text-sm",
        base: "",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

type LavelProps = ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

export const Label = ({ className, ...props }: LavelProps) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />
);
