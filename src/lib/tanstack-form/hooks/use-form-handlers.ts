import type { AnyFormApi } from "@tanstack/react-form";
import type { FormEvent } from "react";

type UseFormHandlersParams = {
  form: AnyFormApi;
};

export const useFormHandlers = ({ form }: UseFormHandlersParams) => {
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const onFormReset = () => {
    form.reset();
    form.validateAllFields("change");
  };

  return { onFormSubmit, onFormReset };
};
