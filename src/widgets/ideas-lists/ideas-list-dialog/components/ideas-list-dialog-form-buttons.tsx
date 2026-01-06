import { ArrowLeftIcon, ArrowRightIcon, FilmIcon } from "lucide-react";
import type { RefObject } from "react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { useCheckScroll } from "@/shared/hooks/use-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
} from "../utils/ideas-list-dialog-form-helpers";

type IdeasListDialogFormButtonsProps = {
  dialogOverlayRef: RefObject<HTMLDivElement | null>;
  currentStep: IdeasListDialogFormSteps;
  isCreateIdeasListPending: boolean;
  isUpdateIdeasListPending: boolean;
};

export const IdeasListDialogFormButtons = withForm({
  defaultValues: {} as IdeasListDialogFormSchema,
  props: {} as IdeasListDialogFormButtonsProps,
  render: ({
    form,
    dialogOverlayRef,
    currentStep,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
  }) => {
    const { isScrolledToBottom } = useCheckScroll({
      elementRef: dialogOverlayRef,
      scrollOffsetBottom: 40,
    });

    const isLoading = isCreateIdeasListPending || isUpdateIdeasListPending;

    const onBackButtonClick = () => {
      if (currentStep === IdeasListDialogFormSteps.PrimaryInfo) {
        form.setFieldValue(
          "currentStep",
          IdeasListDialogFormSteps.TemplateSelection,
        );
      } else if (currentStep === IdeasListDialogFormSteps.ParamsConfiguration) {
        form.setFieldValue("currentStep", IdeasListDialogFormSteps.PrimaryInfo);
      }
    };

    return (
      <DialogFooter
        className={cn("sticky -bottom-10 z-1 duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        {/* Кнопка слева */}
        {currentStep === IdeasListDialogFormSteps.TemplateSelection ? (
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
        {currentStep === IdeasListDialogFormSteps.ParamsConfiguration ? (
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
      </DialogFooter>
    );
  },
});
