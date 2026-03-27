import { useStore } from "@tanstack/react-form";
import type { ReactNode } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Textarea, type TextareaProps } from "@/shared/components/ui/textarea";

import { useFieldContext } from "..";

type TextareaFieldProps = Omit<
  TextareaProps,
  "id" | "state" | "value" | "onChange"
> & {
  label?: string | null;
  action?: ReactNode;
};

export const TextareaField = ({
  label,
  action,
  ...props
}: TextareaFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
  } = useFieldContext<string>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  return (
    <FieldLayout
      labelHtmlFor={name}
      labelText={label}
      message={errors[0]}
      action={action}
    >
      <Textarea
        id={name}
        name={name}
        state={errors.length > 0 ? "error" : "default"}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        {...props}
      />
    </FieldLayout>
  );
};
