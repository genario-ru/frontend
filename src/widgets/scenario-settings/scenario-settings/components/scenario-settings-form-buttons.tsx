import { useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon, BookImageIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

type ScenarioSettingsFormButtonsProps = {
  formId: string;
  editMode: boolean;
  currentStep: ScenarioSettingsFormSteps;
  isCreateScenarioPending: boolean;
  isUpdateScenarioPending: boolean;
};

export const ScenarioSettingsFormButtons = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  props: {} as ScenarioSettingsFormButtonsProps,
  render: ({
    form,
    formId,
    editMode,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  }) => {
    const router = useRouter();
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateScenarioPending || isUpdateScenarioPending;

    const onCancelButtonClick = useCallback(() => {
      router.history.back();
    }, [router]);

    const onBackButtonClick = useCallback(() => {
      if (currentStep === ScenarioSettingsFormSteps.PrimaryInfo) {
        form.setFieldValue(
          "currentStep",
          ScenarioSettingsFormSteps.TemplateSelection,
        );
      } else if (
        currentStep === ScenarioSettingsFormSteps.ParamsConfiguration
      ) {
        form.setFieldValue(
          "currentStep",
          ScenarioSettingsFormSteps.PrimaryInfo,
        );
      }
    }, [currentStep, form]);

    const leftButton = useMemo(() => {
      if (currentStep === ScenarioSettingsFormSteps.TemplateSelection) {
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
      if (currentStep === ScenarioSettingsFormSteps.ParamsConfiguration) {
        if (!editMode) {
          return (
            <Button
              form={formId}
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<BookImageIcon />}
            >
              Сгенерировать сценарий
            </Button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Button
              type="submit"
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
              icon={<BookImageIcon />}
              onClick={() => form.handleSubmit({ submitAction: "regenerate" })}
            >
              Сохранить и сгенерировать новую версию
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

export function ScenarioSettingsFormButtonsSkeleton() {
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
