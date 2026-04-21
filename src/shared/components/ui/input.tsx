import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const inputVariants = cva(
  "duration-200 bg-neutral-2 caret-neutral-8 placeholder:text-neutral-6 w-full truncate outline-none hover:bg-neutral-3",
  {
    variants: {
      size: {
        lg: "px-5 h-12 rounded-4",
        base: "px-4 h-10 rounded-3",
        sm: "px-3 h-8 text-sm rounded-2",
      },
      variant: {
        neutral: "",
        accent: "",
      },
      state: {
        default: "",
        error: "ring-2 ring-negative-6",
        success: "ring-2 ring-positive-6",
      },
    },
    defaultVariants: {
      size: "base",
      variant: "neutral",
      state: "default",
    },
    compoundVariants: [
      {
        variant: "neutral",
        state: "default",
        className: "focus-within:ring-2 focus-within:ring-neutral-8",
      },
      {
        variant: "accent",
        state: "default",
        className: "focus-within:ring-2 focus-within:ring-accent-6",
      },
    ],
  },
);

const inputIconVariants = cva(
  "stroke-neutral-6 pointer-events-none absolute top-1/2 -translate-y-1/2 select-none",
  {
    variants: {
      size: {
        lg: "left-4 size-7",
        base: "left-3 size-6",
        sm: "left-2 size-5",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    Icon?: LucideIcon;
    labelClassName?: string;
  };

export const Input = ({
  id,
  name,
  size = "base",
  variant,
  state,
  Icon,
  className,
  labelClassName,
  ...props
}: InputProps) => {
  const validId = id ?? name;

  return (
    <label
      htmlFor={validId}
      className={cn("relative h-fit w-full", labelClassName)}
    >
      {Icon && <Icon className={inputIconVariants({ size })} />}
      <input
        id={validId}
        name={name}
        className={cn(
          inputVariants({ size, variant, state }),
          {
            "pl-14": Boolean(Icon) && size === "lg",
            "pl-11": Boolean(Icon) && size === "base",
            "pl-8": Boolean(Icon) && size === "sm",
          },
          className,
        )}
        {...props}
      />
    </label>
  );
};
