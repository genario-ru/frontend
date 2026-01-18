import { PencilIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

import { ScenarioAppMenubarDeleteDialog } from "./scenario-app-menubar-delete-dialog";
import { ScenarioAppMenubarImproveDialog } from "./scenario-app-menubar-improve-dialog";

type ScenarioAppMenubarActionsProps = {
  scenarioId: string;
};

export function ScenarioAppMenubarActions({
  scenarioId,
}: ScenarioAppMenubarActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <ScenarioAppMenubarImproveDialog />
      <ButtonLink
        to="/scenarios/settings"
        search={{
          scenarioId,
        }}
        icon={<PencilIcon />}
      >
        Изменить параметры
      </ButtonLink>
      <ScenarioAppMenubarDeleteDialog scenarioId="1" />
    </div>
  );
}
