import {
  type AnyFormApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";

import { CheckboxChipsField } from "./components/checkbox-chips-field";
import { CheckboxField } from "./components/checkbox-field";
import { InputField } from "./components/input-field";
import { MultiSelectField } from "./components/multi-select-field";
import { RadioCardsGroupField } from "./components/radio-cards-group-field";
import { ResetButton } from "./components/reset-button";
import { SelectField } from "./components/select-field";
import { SubmitButton } from "./components/submit-button";
import { TextareaField } from "./components/textarea-field";
import { UploadZoneField } from "./components/upload-zone-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TextareaField,
    CheckboxField,
    CheckboxChipsField,
    SelectField,
    MultiSelectField,
    RadioCardsGroupField,
    UploadZoneField,
  },
  formComponents: { SubmitButton, ResetButton },
});

export type AppFormApi = AnyFormApi;
