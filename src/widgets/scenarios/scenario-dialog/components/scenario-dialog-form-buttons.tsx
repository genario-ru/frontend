import { ArrowLeftIcon, ArrowRightIcon, FilmIcon } from "lucide-react";
import type { RefObject } from "react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { useCheckScroll } from "@/shared/hooks/use-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type ScenarioDialogFormSchema,
  ScenarioDialogFormSteps,
} from "../utils/scenario-dialog-form-helpers";

type ScenarioDialogFormButtonsProps = {
  dialogOverlayRef: RefObject<HTMLDivElement | null>;
  currentStep: ScenarioDialogFormSteps;
  isCreateScenarioPending: boolean;
  isUpdateScenarioPending: boolean;
};

export const ScenarioDialogFormButtons = withForm({
  defaultValues: {} as ScenarioDialogFormSchema,
  props: {} as ScenarioDialogFormButtonsProps,
  render: ({
    form,
    dialogOverlayRef,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  }) => {
    const { isScrolledToBottom } = useCheckScroll({
      elementRef: dialogOverlayRef,
      scrollOffsetBottom: 40,
    });

    const isLoading = isCreateScenarioPending || isUpdateScenarioPending;

    const onBackButtonClick = () => {
      if (currentStep === ScenarioDialogFormSteps.PrimaryInfo) {
        form.setFieldValue(
          "currentStep",
          ScenarioDialogFormSteps.TemplateSelection,
        );
      } else if (currentStep === ScenarioDialogFormSteps.ParamsConfiguration) {
        form.setFieldValue("currentStep", ScenarioDialogFormSteps.PrimaryInfo);
      }
    };

    return (
      <DialogFooter
        className={cn("sticky -bottom-10 z-1 duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        {/* Кнопка слева */}
        {currentStep === ScenarioDialogFormSteps.TemplateSelection ? (
          <DialogClose asChild>
            <Button type="button" size="lg" disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>
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
        {currentStep === ScenarioDialogFormSteps.ParamsConfiguration ? (
          <Button
            variant="primary"
            size="lg"
            disabled={isLoading}
            state={isLoading ? "loading" : "default"}
            icon={<FilmIcon />}
          >
            Создать сценарий
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
      </DialogFooter>
    );
  },
});
