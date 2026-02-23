import { PencilIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

import { ScenarioAppMenubarDeleteDialog } from "./scenario-app-menubar-delete-dialog";
import { ScenarioAppMenubarImproveDialog } from "./scenario-app-menubar-improve-dialog";

type ScenarioAppMenubarActionsProps = {
  scenarioId: string;
  isScenarioLoading: boolean;
  initialSaved: boolean;
};

export function ScenarioAppMenubarActions({
  scenarioId,
}: ScenarioAppMenubarActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <ScenarioAppMenubarImproveDialog scenarioId={scenarioId} />
      <ButtonLink
        priority="tertiary"
        to="/scenarios/settings"
        search={{
          scenarioId,
        }}
        icon={<PencilIcon />}
      />
      {/* {isScenarioLoading ? (
        <Skeleton className="h-10 w-10 rounded-xl" />
      ) : (
        <ScenarioAppMenubarSave
          scenarioId={scenarioId}
          initialSaved={initialSaved}
        />
      )} */}
      <ScenarioAppMenubarDeleteDialog scenarioId={scenarioId} />
    </div>
  );
}
