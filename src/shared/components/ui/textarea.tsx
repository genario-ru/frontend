import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const textareaWrapperVariants = cva(
  "w-full h-fit duration-200 overflow-hidden bg-neutral-2 hover:bg-neutral-3",
  {
    variants: {
      size: {
        base: "rounded-4",
        sm: "rounded-3",
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

const textareaVariants = cva(
  "h-full w-full resize-none truncate overflow-auto whitespace-normal outline-none placeholder:text-neutral-6",
  {
    variants: {
      size: {
        sm: "text-sm p-2",
        base: "px-3 py-2.5",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof textareaWrapperVariants> & {
    wrapperProps?: ComponentProps<"div">;
  };

export const Textarea = ({
  size,
  state,
  className,
  wrapperProps: { className: wrapperClassName, ...wrapperProps } = {},
  children,
  ...props
}: TextareaProps) => {
  return (
    <div
      className={cn(textareaWrapperVariants({ size, state }), wrapperClassName)}
      {...wrapperProps}
    >
      <textarea
        rows={6}
        className={cn(textareaVariants({ size }), className)}
        {...props}
      />
      {children}
    </div>
  );
};
