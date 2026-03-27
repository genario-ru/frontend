import { useStore } from "@tanstack/react-form";
import type { ChangeEvent, ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import { Input, type InputProps } from "@/shared/components/ui/input";

import { useFieldContext } from "..";

type InputFieldProps = Omit<
  InputProps,
  "id" | "state" | "value" | "onChange"
> & {
  label?: string | null;
  action?: ReactNode;
  fieldLayoutProps?: FieldLayoutProps;
};

export const InputField = <TInputData extends string | number>({
  type = "text",
  label,
  action,
  fieldLayoutProps,
  ...props
}: InputFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
  } = useFieldContext<TInputData>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const inputNumber = Number(e.target.value);

      handleChange(inputNumber as TInputData);
    } else {
      handleChange(e.target.value as TInputData);
    }
  };

  return (
    <FieldLayout
      labelHtmlFor={name}
      labelText={label}
      action={action}
      message={errors[0]}
      {...fieldLayoutProps}
    >
      <Input
        id={name}
        name={name}
        type={type}
        state={errors.length > 0 ? "error" : "default"}
        value={value}
        onChange={onInputChange}
        {...props}
      />
    </FieldLayout>
  );
};
