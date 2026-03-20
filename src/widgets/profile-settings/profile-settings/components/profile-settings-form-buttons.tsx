import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

import type { ProfileSettingsFormValues } from "../schemas/profile-settings-form-schema";

type ProfileSettingsFormButtonsProps = {
  isEditMode: boolean;
  isLoading: boolean;
  isScrolledToBottom: boolean;
  onCancelClick: () => void;
};

export const ProfileSettingsFormButtons = withForm({
  defaultValues: {} as ProfileSettingsFormValues,
  props: {} as ProfileSettingsFormButtonsProps,
  render: ({
    form,
    isEditMode,
    isLoading,
    isScrolledToBottom,
    onCancelClick,
  }) => {
    return (
      <Island
        row
        roundedTop={false}
        roundedBottom={isScrolledToBottom}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        <Button
          type="button"
          size="lg"
          disabled={isLoading}
          onClick={onCancelClick}
        >
          Отмена
        </Button>
        <form.AppForm>
          <form.SubmitButton
            size="lg"
            state={isLoading ? "loading" : "default"}
            className="ml-auto"
          >
            {isEditMode ? "Сохранить" : "Создать профиль"}
          </form.SubmitButton>
        </form.AppForm>
      </Island>
    );
  },
});
