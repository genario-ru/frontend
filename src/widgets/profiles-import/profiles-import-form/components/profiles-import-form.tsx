import { PlusIcon, SearchIcon, TrashIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useProfilesImportForm } from "../hooks/use-profiles-import-form";

export function ProfilesImportForm() {
  const {
    form,
    onFormSubmit,
    handleValidateProfileChannel,
    handleAddProfileChannel,
  } = useProfilesImportForm();

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-4">
      <form.AppField name="channelUrls" mode="array">
        {(field) =>
          field.state.value.map((_, index) => (
            <form.AppField key={index} name={`channelUrls[${index}]`}>
              {(subfield) => (
                <div
                  key={`${field.name}[${index}]`}
                  className="flex flex-row gap-2"
                >
                  <subfield.InputField placeholder="Введите ссылку на канал" />
                  {subfield.state.value.length === 0 && index > 0 && (
                    <Button
                      type="button"
                      icon={<TrashIcon />}
                      onClick={() => field.removeValue(index)}
                    />
                  )}
                  {subfield.state.value.length > 0 && (
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
              )}
            </form.AppField>
          ))
        }
      </form.AppField>
      <div className="flex w-full gap-2">
        <Button
          type="button"
          icon={<PlusIcon />}
          onClick={handleAddProfileChannel}
          className="flex-1"
        >
          Добавить канал
        </Button>
        <form.AppForm>
          <form.SubmitButton
            variant="accent"
            state="default"
            className="flex-1"
          >
            Создать профили
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
