import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LightbulbIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useMemo } from "react";

import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { useGoBack } from "@/shared/hooks/use-go-back";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

type IdeasListSettingsFormButtonsProps = {
  formId: string;
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
    formId,
    currentStep,
    editMode,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
  }) => {
    const goBack = useGoBack();
    const { isMobile } = useBreakpoints();
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateIdeasListPending || isUpdateIdeasListPending;

    const onBackButtonClick = useCallback(() => {
      switch (currentStep) {
        case IdeasListSettingsFormSteps.PrimaryInfo:
          form.setFieldValue(
            "currentStep",
            IdeasListSettingsFormSteps.TemplateSelection,
          );

          break;

        case IdeasListSettingsFormSteps.ParamsConfiguration:
          form.setFieldValue(
            "currentStep",
            IdeasListSettingsFormSteps.PrimaryInfo,
          );

          break;

        default:
          break;
      }
    }, [currentStep, form]);

    const leftButton = useMemo(() => {
      if (currentStep === IdeasListSettingsFormSteps.TemplateSelection) {
        return (
          <Button
            type="button"
            size="lg"
            icon={isMobile ? <XIcon /> : null}
            disabled={isLoading}
            onClick={goBack}
          >
            {!isMobile ? "Отмена" : null}
          </Button>
        );
      }

      return (
        <Button
          size="lg"
          type="button"
          iconPosition="left"
          disabled={isLoading}
          icon={isMobile ? <ArrowLeftIcon /> : null}
          onClick={onBackButtonClick}
        >
          {!isMobile ? "Назад" : null}
        </Button>
      );
    }, [currentStep, isMobile, isLoading, goBack, onBackButtonClick]);

    const rightButtons = useMemo(() => {
      if (currentStep === IdeasListSettingsFormSteps.ParamsConfiguration) {
        if (!editMode) {
          return (
            <Button
              form={formId}
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
              form={formId}
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
            >
              Сохранить
            </Button>
            <Button
              type="button"
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<LightbulbIcon />}
              onClick={() => form.handleSubmit({ submitAction: "regenerate" })}
            >
              Сохранить и сгенерировать
            </Button>
          </div>
        );
      }

      return (
        <Button
          form={formId}
          size="lg"
          disabled={isLoading}
          icon={<ArrowRightIcon />}
        >
          Далее
        </Button>
      );
    }, [currentStep, editMode, form, formId, isLoading]);

    return (
      <Island
        row
        roundedBottom={false}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-top-1": !isScrolledToBottom,
        })}
      >
        {leftButton}
        {rightButtons}
      </Island>
    );
  },
});

export function IdeasListSettingsFormButtonsSkeleton() {
  const { isScrolledToBottom } = usePageCheckScroll();

  return (
    <Island
      row
      roundedBottom={false}
      className={cn("sticky bottom-0 justify-between duration-200", {
        "shadow-top-1": !isScrolledToBottom,
      })}
    >
      <ItemsList
        row
        noParent
        count={2}
        item={<Skeleton className="rounded-4 h-12 w-32" />}
      />
    </Island>
  );
}
