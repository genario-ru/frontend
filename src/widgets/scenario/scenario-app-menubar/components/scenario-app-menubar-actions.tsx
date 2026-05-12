import { WandSparklesIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useScenarioAppMenubarImproveDialog } from "../hooks/use-scenario-app-menubar-improve-dialog";
import { ScenarioAppMenubarImproveDialog } from "./scenario-app-menubar-improve-dialog";
import { ScenarioAppMenubarMoreActions } from "./scenario-app-menubar-more-actions";

type ScenarioAppMenubarActionsProps = {
  scenarioId: string;
  scenarioVersionId?: string;
};

export function ScenarioAppMenubarActions({
  scenarioId,
  scenarioVersionId,
}: ScenarioAppMenubarActionsProps) {
  const {
    form,
    isImproveDialogOpen,
    isImproveDialogPending,
    setIsImproveDialogOpen,
    onFormSubmit,
  } = useScenarioAppMenubarImproveDialog({ scenarioId });

  return (
    <div className="flex items-center gap-1">
      <ScenarioAppMenubarImproveDialog
        trigger={<Button priority="tertiary" icon={<WandSparklesIcon />}>Улучшить</Button>}
        form={form}
        isImproveDialogOpen={isImproveDialogOpen}
        isImproveDialogPending={isImproveDialogPending}
        setIsImproveDialogOpen={setIsImproveDialogOpen}
        onFormSubmit={onFormSubmit}
      />
      <ScenarioAppMenubarMoreActions
        scenarioId={scenarioId}
        scenarioVersionId={scenarioVersionId}
      />
    </div>
  );
}
