import { PlusIcon } from "lucide-react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";

import type { ProfilesImportFormValues } from "../schemas/profiles-import-form-schema";

type ProfilesImportFormButtonsProps = {
  isCreateProfilesFromChannelsPending: boolean;
  handleAddProfileChannel: () => void;
};

export const ProfilesImportFormButtons = withForm({
  defaultValues: {} as ProfilesImportFormValues,
  props: {} as ProfilesImportFormButtonsProps,
  render: ({
    form,
    isCreateProfilesFromChannelsPending,
    handleAddProfileChannel,
  }) => {
    return (
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <Button
          size="lg"
          type="button"
          icon={<PlusIcon />}
          onClick={handleAddProfileChannel}
          className="w-full flex-1 md:w-auto"
        >
          Добавить канал
        </Button>
        <form.AppForm>
          <form.SubmitButton
            size="lg"
            variant="accent"
            state={isCreateProfilesFromChannelsPending ? "loading" : "default"}
            className="w-full flex-1 md:w-auto"
          >
            Создать профили
          </form.SubmitButton>
        </form.AppForm>
      </div>
    );
  },
});
