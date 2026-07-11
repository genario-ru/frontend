import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import type { ProfileSettingsGeneralFormValues } from "../schemas/profile-settings-general-form-schema";

type ProfileSettingsFormActionsProps = {
  formId: string;
  isEditMode: boolean;
  isLoading: boolean;
  onCancelClick: () => void;
};

export const ProfileSettingsFormActions = withForm({
  defaultValues: {} as ProfileSettingsGeneralFormValues,
  props: {} as ProfileSettingsFormActionsProps,
  render: ({ form, formId, isEditMode, isLoading, onCancelClick }) => {
    const { isScrolledToBottom } = usePageCheckScroll();

    return (
      <Island
        row
        roundedBottom={false}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-top-1": !isScrolledToBottom,
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
            form={formId}
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

export function ProfileSettingsFormActionsSkeleton() {
  const { isScrolledToBottom } = usePageCheckScroll();

  return (
    <Island
      row
      roundedBottom={false}
      className={cn("sticky bottom-0 justify-between duration-200", {
        "shadow-top-1": !isScrolledToBottom,
      })}
    >
      <Skeleton className="rounded-4 h-12 w-32" />
      <Skeleton className="rounded-4 h-12 w-32" />
    </Island>
  );
}
