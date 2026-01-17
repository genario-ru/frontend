import { ArrowLeftIcon, ArrowRightIcon, FilmIcon } from "lucide-react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

type IdeasListSettingsFormButtonsProps = {
  currentStep: IdeasListSettingsFormSteps;
  isCreateIdeasListPending: boolean;
  isUpdateIdeasListPending: boolean;
};

export const IdeasListSettingsFormButtons = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  props: {} as IdeasListSettingsFormButtonsProps,
  render: ({
    form,
    currentStep,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
  }) => {
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateIdeasListPending || isUpdateIdeasListPending;

    const onBackButtonClick = () => {
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
    };

    return (
      <Island
        row
        roundedTop={false}
        roundedBottom={isScrolledToBottom}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        {/* Кнопка слева */}
        {currentStep === IdeasListSettingsFormSteps.TemplateSelection ? (
          <Button type="button" size="lg" disabled={isLoading}>
            Отмена
          </Button>
        ) : (
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
        )}

        {/* Кнопка справа */}
        {currentStep === IdeasListSettingsFormSteps.ParamsConfiguration ? (
          <Button
            variant="primary"
            size="lg"
            disabled={isLoading}
            state={isLoading ? "loading" : "default"}
            icon={<FilmIcon />}
          >
            Создать список идей
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            disabled={isLoading}
            icon={<ArrowRightIcon />}
          >
            Далее
          </Button>
        )}
      </Island>
    );
  },
});
