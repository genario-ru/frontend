import { useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon, LightbulbIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

type IdeasListSettingsFormButtonsProps = {
  currentStep: IdeasListSettingsFormSteps;
  editMode: boolean;
  isCreateIdeasListPending: boolean;
  isUpdateIdeasListPending: boolean;
};

export const IdeasListSettingsFormButtons = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  props: {} as IdeasListSettingsFormButtonsProps,
  render: ({
    form,
    currentStep,
    editMode,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
  }) => {
    const router = useRouter();
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateIdeasListPending || isUpdateIdeasListPending;

    const onCancelButtonClick = useCallback(() => {
      router.history.back();
    }, [router]);

    const onBackButtonClick = useCallback(() => {
      if (currentStep === IdeasListSettingsFormSteps.PrimaryInfo) {
        form.setFieldValue(
          "currentStep",
          IdeasListSettingsFormSteps.TemplateSelection,
        );
      } else if (
        currentStep === IdeasListSettingsFormSteps.ParamsConfiguration
      ) {
        form.setFieldValue(
          "currentStep",
          IdeasListSettingsFormSteps.PrimaryInfo,
        );
      }
    }, [currentStep, form]);

    const leftButton = useMemo(() => {
      if (currentStep === IdeasListSettingsFormSteps.TemplateSelection) {
        return (
          <Button
            type="button"
            size="lg"
            disabled={isLoading}
            onClick={onCancelButtonClick}
          >
            Отмена
          </Button>
        );
      }

      return (
        <Button
          size="lg"
          type="button"
          iconPosition="left"
          disabled={isLoading}
          icon={<ArrowLeftIcon />}
          onClick={onBackButtonClick}
        >
          Назад
        </Button>
      );
    }, [currentStep, isLoading, onCancelButtonClick, onBackButtonClick]);

    const rightButtons = useMemo(() => {
      if (currentStep === IdeasListSettingsFormSteps.ParamsConfiguration) {
        if (!editMode) {
          return (
            <Button
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<LightbulbIcon />}
            >
              Сгенерировать идеи
            </Button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Button
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
            >
              Сохранить
            </Button>
            <Button
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<LightbulbIcon />}
              onClick={() => form.handleSubmit({ submitAction: "regenerate" })}
            >
              Сохранить и придумать новые идеи
            </Button>
          </div>
        );
      }

      return (
        <Button size="lg" disabled={isLoading} icon={<ArrowRightIcon />}>
          Далее
        </Button>
      );
    }, [currentStep, editMode, form, isLoading]);

    return (
      <Island
        row
        roundedTop={false}
        roundedBottom={isScrolledToBottom}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        {leftButton}
        {rightButtons}
      </Island>
    );
  },
});

export function IdeasListSettingsFormButtonsSkeleton() {
  return (
    <Island row roundedTop={false}>
      <ItemsList
        row
        count={2}
        item={<Skeleton className="rounded-4 h-10 w-32" />}
        className="w-full items-center justify-between"
      />
    </Island>
  );
}
