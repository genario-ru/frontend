import { SearchIcon, TrashIcon } from "lucide-react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";

import type { ProfilesImportFormValues } from "../schemas/profiles-import-form-schema";

type ProfilesImportFormFieldsProps = {
  successValidationFields: number[];
  activeValidationFields: number[];
  handleValidateProfileChannel: (channelUrl: string, index: number) => void;
};

export const ProfilesImportFormFields = withForm({
  defaultValues: {} as ProfilesImportFormValues,
  props: {} as ProfilesImportFormFieldsProps,
  render: ({
    form,
    successValidationFields,
    activeValidationFields,
    handleValidateProfileChannel,
  }) => {
    return (
      <form.AppField name="channelUrls" mode="array">
        {(field) =>
          field.state.value.map((_, index) => (
            <form.AppField key={index} name={`channelUrls[${index}]`}>
              {(subfield) => {
                const isFirst = index === 0;
                const isFilled = subfield.state.value.length > 0;
                const isValid = subfield.state.meta.isValid;
                const isRemoveAvailable = !isFirst && (!isFilled || !isValid);

                const isValidationInProgress =
                  activeValidationFields.includes(index);

                const isSuccessValidation =
                  successValidationFields.includes(index);

                const message = isSuccessValidation
                  ? "Указанный канал найден"
                  : undefined;

                const messageVariant = isSuccessValidation
                  ? "positive"
                  : undefined;

                return (
                  <div
                    key={`${field.name}[${index}]`}
                    className="flex flex-row gap-2"
                  >
                    <subfield.InputField
                      size="lg"
                      state={isSuccessValidation ? "success" : "default"}
                      placeholder="Введите ссылку на канал"
                      fieldLayoutProps={{
                        message,
                        messageVariant,
                      }}
                    />
                    {isValid && (
                      <Button
                        size="lg"
                        type="button"
                        icon={<SearchIcon />}
                        state={isValidationInProgress ? "loading" : "default"}
                        onClick={() =>
                          handleValidateProfileChannel(
                            subfield.state.value,
                            index,
                          )
                        }
                      />
                    )}
                    {isRemoveAvailable && (
                      <Button
                        size="lg"
                        type="button"
                        icon={<TrashIcon />}
                        onClick={() => field.removeValue(index)}
                      />
                    )}
                  </div>
                );
              }}
            </form.AppField>
          ))
        }
      </form.AppField>
    );
  },
});
