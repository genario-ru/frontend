import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const inputVariants = cva(
  "duration-200 bg-neutral-2 caret-neutral-8 placeholder:text-neutral-6 w-full truncate outline-none",
  {
    variants: {
      size: {
        lg: "px-5 h-12 rounded-4",
        base: "px-4 h-10 rounded-3",
        sm: "px-3 h-8 rounded-2.5 text-sm",
      },
      state: {
        default: "focus-within:ring-2 focus-within:ring-neutral-8",
        error: "ring-2 ring-negative-6",
      },
    },
    defaultVariants: {
      size: "base",
      state: "default",
    },
  },
);

const inputIconVariants = cva(
  "stroke-neutral-6 pointer-events-none absolute top-1/2 -translate-y-1/2 select-none",
  {
    variants: {
      size: {
        lg: "left-5 size-7",
        base: "left-4 size-6",
        sm: "left-3 size-5",
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
  size,
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
          inputVariants({ size, state }),
          {
            "pl-12": Boolean(Icon) && size === "lg",
            "pl-10": Boolean(Icon) && size === "base",
            "pl-8": Boolean(Icon) && size === "sm",
          },
          className,
        )}
        {...props}
      />
    </label>
  );
};
