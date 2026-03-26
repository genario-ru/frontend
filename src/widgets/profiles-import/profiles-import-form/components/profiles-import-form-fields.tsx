import { SearchIcon, TrashIcon } from "lucide-react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";

import type { ProfilesImportFormValues } from "../schemas/profiles-import-form-schema";

type ProfilesImportFormFieldsProps = {
  handleValidateProfileChannel: (channelUrl: string, index: number) => void;
};

export const ProfilesImportFormFields = withForm({
  defaultValues: {} as ProfilesImportFormValues,
  props: {} as ProfilesImportFormFieldsProps,
  render: ({ form, handleValidateProfileChannel }) => {
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

                return (
                  <div
                    key={`${field.name}[${index}]`}
                    className="flex flex-row gap-2"
                  >
                    <subfield.InputField placeholder="Введите ссылку на канал" />
                    {isRemoveAvailable && (
                      <Button
                        type="button"
                        icon={<TrashIcon />}
                        onClick={() => field.removeValue(index)}
                      />
                    )}
                    {isValid && (
                      <Button
                        type="button"
                        icon={<SearchIcon />}
                        onClick={() =>
                          handleValidateProfileChannel(
                            subfield.state.value,
                            index,
                          )
                        }
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
