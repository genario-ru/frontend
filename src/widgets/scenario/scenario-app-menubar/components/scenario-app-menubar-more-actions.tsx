import { useScenarioAppMenubarMoreActions } from "../hooks/use-scenario-app-menubar-more-actions";
import { ScenarioAppMenubarMoreActionsDrawer } from "./scenario-app-menubar-more-actions-drawer";
import { ScenarioAppMenubarMoreActionsDropdown } from "./scenario-app-menubar-more-actions-dropdown";

type ScenarioAppMenubarMoreActionsProps = {
  scenarioId: string;
  scenarioVersionId?: string;
  withImproveAction?: boolean;
};

export function ScenarioAppMenubarMoreActions({
  scenarioId,
  scenarioVersionId,
  withImproveAction = false,
}: ScenarioAppMenubarMoreActionsProps) {
  const { isMobile } = useScenarioAppMenubarMoreActions();

  if (isMobile) {
    return (
      <ScenarioAppMenubarMoreActionsDrawer
        scenarioId={scenarioId}
        scenarioVersionId={scenarioVersionId}
        withImproveAction={withImproveAction}
      />
    );
  }

  return (
    <ScenarioAppMenubarMoreActionsDropdown
      scenarioId={scenarioId}
      scenarioVersionId={scenarioVersionId}
      withImproveAction={withImproveAction}
    />
  );
}
