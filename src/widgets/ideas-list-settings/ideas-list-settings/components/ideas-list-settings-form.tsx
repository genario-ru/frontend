import type { GetApiV1IdeasListsIdeasListIdQueryResponse } from "@/codegen/api/product";
import { ErrorPlug } from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";

import { useIdeasListSettingsForm } from "../hooks/use-ideas-list-settings-form";
import { IdeasListSettingsCurrentSubform } from "./ideas-list-settings-current-subform";
import {
  IdeasListSettingsFormButtons,
  IdeasListSettingsFormButtonsSkeleton,
} from "./ideas-list-settings-form-buttons";
import {
  IdeasListSettingsFormNavigationSteps,
  IdeasListSettingsFormNavigationStepsSkeleton,
} from "./ideas-list-settings-form-navigation-steps";
import { IdeasListSettingsFormNavigationStepsListener } from "./ideas-list-settings-form-navigation-steps-listener";
import { IdeasListSettingsTemplatesSelectionSubformSkeleton } from "./ideas-list-settings-templates-selection-subform";

type IdeasListSettingsFormProps = {
  templateId: string | undefined;
  ideasListData: GetApiV1IdeasListsIdeasListIdQueryResponse | undefined;
};

export function IdeasListSettingsForm({
  templateId,
  ideasListData,
}: IdeasListSettingsFormProps) {
  const {
    form,
    currentStep,
    onFormSubmit,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
  } = useIdeasListSettingsForm({ templateId, ideasListData });

  return (
    <form onSubmit={onFormSubmit} className="flex flex-1 flex-col">
      <IdeasListSettingsFormNavigationStepsListener
        form={form}
        currentStep={currentStep}
      />
      <Island roundedBottom={false} className="flex-1 gap-6">
        <IdeasListSettingsFormNavigationSteps form={form} />
        <IdeasListSettingsCurrentSubform
          form={form}
          currentStep={currentStep}
        />
      </Island>
      <IdeasListSettingsFormButtons
        form={form}
        editMode={Boolean(ideasListData)}
        currentStep={currentStep}
        isCreateIdeasListPending={isCreateIdeasListPending}
        isUpdateIdeasListPending={isUpdateIdeasListPending}
      />
    </form>
  );
}

export function IdeasListSettingsFormSkeleton() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Island roundedBottom={false} className="flex-1 gap-6">
        <IdeasListSettingsFormNavigationStepsSkeleton />
        <IdeasListSettingsTemplatesSelectionSubformSkeleton />
      </Island>
      <IdeasListSettingsFormButtonsSkeleton />
    </div>
  );
}

export function IdeasListSettingsFormErrorPlug() {
  return (
    <Island className="flex-1">
      <ErrorPlug
        className="flex-1"
        title="Ошибка загрузки"
        description="Произошла ошибка при загрузке формы. Попробуйте обновить страницу"
      />
    </Island>
  );
}
