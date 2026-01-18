import { PencilIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { ScenarioAppMenubarDeleteDialog } from "./scenario-app-menubar-delete-dialog";
import { ScenarioAppMenubarImproveDialog } from "./scenario-app-menubar-improve-dialog";
import { ScenarioAppMenubarSave } from "./scenario-app-menubar-save";

type ScenarioAppMenubarActionsProps = {
  scenarioId: string;
  isScenarioLoading: boolean;
  initialSaved: boolean;
};

export function ScenarioAppMenubarActions({
  scenarioId,
  isScenarioLoading,
  initialSaved,
}: ScenarioAppMenubarActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <ScenarioAppMenubarImproveDialog scenarioId={scenarioId} />
      <ButtonLink
        to="/scenarios/settings"
        search={{
          scenarioId,
        }}
        icon={<PencilIcon />}
      >
        Изменить параметры
      </ButtonLink>
      {isScenarioLoading ? (
        <Skeleton className="h-10 w-10 rounded-xl" />
      ) : (
        <ScenarioAppMenubarSave
          scenarioId={scenarioId}
          initialSaved={initialSaved}
        />
      )}
      <ScenarioAppMenubarDeleteDialog scenarioId="1" />
    </div>
  );
}
