import { ChevronRightIcon } from "lucide-react";

import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import { ScenarioVersionRadioIndicator } from "@/features/scenario/scenario-app-menubar/components/scenario-version-radio-indicator";
import {
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useScenarioAppMenubarStatusSubmenu } from "../hooks/use-scenario-app-menubar-status-submenu";

type ScenarioAppMenubarStatusSubmenuProps = {
  scenarioId: string;
  handleDropdownMenuClose: () => void;
};

export function ScenarioAppMenubarStatusSubmenu({
  scenarioId,
  handleDropdownMenuClose,
}: ScenarioAppMenubarStatusSubmenuProps) {
  const {
    productionStatuses,
    activeProductionStatus,
    isUpdateScenarioPending,
    handleSelectStatus,
  } = useScenarioAppMenubarStatusSubmenu({
    scenarioId,
    handleDropdownMenuClose,
  });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger asChild>
        <AppMenubarDropdownMenuButton icon={<ChevronRightIcon />}>
          Статус
        </AppMenubarDropdownMenuButton>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuGroup>
          {productionStatuses.map((status) => {
            const isActive = status.id === activeProductionStatus?.id;
            const onClick = () => handleSelectStatus(status.id);

            return (
              <AppMenubarDropdownMenuButton
                key={status.id}
                priority="tertiary"
                iconPosition="left"
                align="start"
                className="w-full"
                icon={<ScenarioVersionRadioIndicator checked={isActive} />}
                disabled={isUpdateScenarioPending}
                onClick={onClick}
              >
                <div className="flex flex-col">
                  <p className="truncate text-left">{status.name}</p>
                  {status.description && (
                    <p className="text-neutral-7 truncate text-left text-xs">
                      {status.description}
                    </p>
                  )}
                </div>
              </AppMenubarDropdownMenuButton>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
