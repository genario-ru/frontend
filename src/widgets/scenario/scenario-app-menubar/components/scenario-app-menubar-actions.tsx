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
  return (
    <div className="flex items-center gap-1">
      <ScenarioAppMenubarImproveDialog scenarioId={scenarioId} />
      <ScenarioAppMenubarMoreActions
        scenarioId={scenarioId}
        scenarioVersionId={scenarioVersionId}
      />
    </div>
  );
}
