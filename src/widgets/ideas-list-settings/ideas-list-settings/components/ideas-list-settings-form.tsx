import type { GetApiV1IdeasListsByIdeasListIdQueryResponse } from "@/codegen/api/product";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";

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

const IDEAS_LIST_SETTINGS_FORM_ID = "ideas-list-settings-form";

type IdeasListSettingsFormProps = {
  templateId: string | undefined;
  ideasListData: GetApiV1IdeasListsByIdeasListIdQueryResponse | undefined;
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
    <>
      <form
        id={IDEAS_LIST_SETTINGS_FORM_ID}
        onSubmit={onFormSubmit}
        className="flex flex-1 flex-col"
      >
        <IdeasListSettingsFormNavigationStepsListener
          form={form}
          currentStep={currentStep}
        />
        <Island className="flex-1 gap-6">
          <IdeasListSettingsFormNavigationSteps form={form} />
          <IdeasListSettingsCurrentSubform
            form={form}
            currentStep={currentStep}
          />
        </Island>
      </form>
      <IdeasListSettingsFormButtons
        form={form}
        formId={IDEAS_LIST_SETTINGS_FORM_ID}
        editMode={Boolean(ideasListData)}
        currentStep={currentStep}
        isCreateIdeasListPending={isCreateIdeasListPending}
        isUpdateIdeasListPending={isUpdateIdeasListPending}
      />
    </>
  );
}

export function IdeasListSettingsFormSkeleton() {
  return (
    <>
      <Island className="flex-1 gap-6">
        <IdeasListSettingsFormNavigationStepsSkeleton />
        <IdeasListSettingsTemplatesSelectionSubformSkeleton />
      </Island>
      <IdeasListSettingsFormButtonsSkeleton />
    </>
  );
}

export function IdeasListSettingsFormErrorPlug() {
  return (
    <Island className="flex-1" roundedBottom={false}>
      <Plug
        variant="negative"
        className="flex-1"
        title="Ошибка загрузки"
        description="Произошла ошибка при загрузке формы. Попробуйте обновить страницу"
      />
    </Island>
  );
}
