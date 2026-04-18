import { ChevronRightIcon } from "lucide-react";

import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import { ScenarioVersionRadioIndicator } from "@/features/scenario/scenario-app-menubar/components/scenario-version-radio-indicator";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useScenarioAppMenubarVersionsSubmenu } from "../hooks/use-scenario-app-menubar-versions-submenu";

type ScenarioAppMenubarVersionsSubmenuProps = {
  scenarioId: string;
};

export function ScenarioAppMenubarVersionsSubmenu({
  scenarioId,
}: ScenarioAppMenubarVersionsSubmenuProps) {
  const { versionItems, activeVersionId } =
    useScenarioAppMenubarVersionsSubmenu({ scenarioId });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger asChild>
        <AppMenubarDropdownMenuButton icon={<ChevronRightIcon />}>
          Версия
        </AppMenubarDropdownMenuButton>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuGroup>
          {versionItems.map((version) => {
            const isActive = version.id === activeVersionId;

            return (
              <DropdownMenuItem key={version.id} asChild>
                <AppMenubarButtonLink
                  to="/scenarios/$scenarioId"
                  params={{ scenarioId }}
                  search={(prev) => ({ ...prev, versionId: version.id })}
                  align="start"
                  iconPosition="left"
                  className="w-full"
                  icon={<ScenarioVersionRadioIndicator checked={isActive} />}
                >
                  {version.label}
                </AppMenubarButtonLink>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
