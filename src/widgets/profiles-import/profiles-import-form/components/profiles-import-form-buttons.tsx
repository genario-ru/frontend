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
            state={isCreateProfilesFromChannelsPending ? "loading" : "default"}
            className="flex-1"
          >
            Создать профили
          </form.SubmitButton>
        </form.AppForm>
      </div>
    );
  },
});
