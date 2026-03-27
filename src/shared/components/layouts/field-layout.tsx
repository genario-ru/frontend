import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/cn";

const fieldLayoutMessageVariants = cva(
  "text-sm font-medium whitespace-pre-line",
  {
    variants: {
      variant: {
        neutral: "text-neutral-8",
        negative: "text-negative-6",
        positive: "text-positive-6",
        accent: "text-accent-6",
      },
    },
    defaultVariants: {
      variant: "negative",
    },
  },
);

type FieldLayoutMessageVariant = VariantProps<
  typeof fieldLayoutMessageVariants
>;

export type FieldLayoutProps = ComponentProps<"div"> & {
  labelHtmlFor?: string;
  labelText?: string | null;
  action?: ReactNode;
  message?: string;
  messageVariant?: FieldLayoutMessageVariant["variant"];
};

export function FieldLayout({
  labelHtmlFor,
  labelText,
  action,
  message,
  messageVariant,
  className,
  children,
  ...props
}: FieldLayoutProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {(labelText || action) && (
        <header className="flex items-center justify-between gap-2">
          {labelText && <Label htmlFor={labelHtmlFor}>{labelText}</Label>}
          {action}
        </header>
      )}
      {children}
      {message && (
        <p className={fieldLayoutMessageVariants({ variant: messageVariant })}>
          {message}
        </p>
      )}
    </div>
  );
}
