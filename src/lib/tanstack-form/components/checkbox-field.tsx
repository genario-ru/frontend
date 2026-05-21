import { useStore } from "@tanstack/react-form";
import type { ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import { Checkbox, type CheckboxProps } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/cn";

import { useFieldContext } from "..";

type CheckboxFieldProps = Omit<
  CheckboxProps,
  "id" | "checked" | "onCheckedChange"
> & {
  label?: ReactNode;
  labelClassName?: string;
  fieldLayoutProps?: FieldLayoutProps;
};

export const CheckboxField = ({
  label,
  labelClassName,
  fieldLayoutProps: { message, messageVariant, ...fieldLayoutProps } = {},
  ...props
}: CheckboxFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
  } = useFieldContext<boolean>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  return (
    <FieldLayout
      message={errors[0] ?? message}
      messageVariant={messageVariant}
      {...fieldLayoutProps}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={name}
          state={errors.length > 0 ? "error" : "default"}
          checked={value}
          onCheckedChange={(checked) => handleChange(checked === true)}
          aria-invalid={errors.length > 0}
          {...props}
        />
        {label && (
          <Label
            htmlFor={name}
            className={cn("text-neutral-7 text-sm font-normal", labelClassName)}
          >
            {label}
          </Label>
        )}
      </div>
    </FieldLayout>
  );
};
