import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { CheckboxCardsField } from "./components/checkbox-cards-field";
import { CheckboxChipsField } from "./components/checkbox-chips-field";
import { InputField } from "./components/input-field";
import { MultiSelectField } from "./components/multi-select-field";
import { RadioCardsGroupField } from "./components/radio-cards-group-field";
import { ResetButton } from "./components/reset-button";
import { SelectField } from "./components/select-field";
import { SubmitButton } from "./components/submit-button";
import { TextareaField } from "./components/textarea-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TextareaField,
    CheckboxChipsField,
    SelectField,
    MultiSelectField,
    CheckboxCardsField,
    RadioCardsGroupField,
  },
  formComponents: { SubmitButton, ResetButton },
});

export type AppFormApi = ReturnType<typeof useAppForm>;
