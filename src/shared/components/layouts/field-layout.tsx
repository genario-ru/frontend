import type { ComponentProps, ReactNode } from "react";

import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/cn";

type FieldLayoutProps = ComponentProps<"div"> & {
  labelHtmlFor?: string;
  labelText?: string | null;
  action?: ReactNode;
  errorMessage?: string;
};

export function FieldLayout({
  labelHtmlFor,
  labelText,
  action,
  errorMessage,
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
      {errorMessage && (
        <p className="text-negative-6 w-full text-sm font-medium whitespace-pre-wrap">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
