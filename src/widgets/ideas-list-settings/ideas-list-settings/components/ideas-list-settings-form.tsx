import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";
import { Island } from "@/shared/components/ui/island";

import { useIdeasListSettingsForm } from "../hooks/use-ideas-list-settings-form";
import { IdeasListSettingsCurrentSubform } from "./ideas-list-settings-current-subform";
import { IdeasListSettingsFormButtons } from "./ideas-list-settings-form-buttons";
import { IdeasListSettingsFormNavigationSteps } from "./ideas-list-settings-form-navigation-steps";
import { IdeasListSettingsFormNavigationStepsListener } from "./ideas-list-settings-form-navigation-steps-listener";

type IdeasListSettingsFormProps = {
  templateId: string | undefined;
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
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
