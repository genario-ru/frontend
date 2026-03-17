import { EllipsisIcon, PencilIcon } from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useScenarioAppMenubarMoreActions } from "../hooks/use-scenario-app-menubar-more-actions";
import { ScenarioAppMenubarDeleteDialog } from "./scenario-app-menubar-delete-dialog";
import { ScenarioAppMenubarExportSubmenu } from "./scenario-app-menubar-export-submenu";

type ScenarioAppMenubarMoreActionsProps = {
  scenarioId: string;
  scenarioVersionId?: string;
};

export function ScenarioAppMenubarMoreActions({
  scenarioId,
  scenarioVersionId,
}: ScenarioAppMenubarMoreActionsProps) {
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  } = useScenarioAppMenubarMoreActions();

  return (
    <DropdownMenu
      modal={false}
      open={isDropdownMenuOpen}
      onOpenChange={setIsDropdownMenuOpen}
    >
      <DropdownMenuTrigger asChild>
        <AppMenubarButton priority="tertiary" icon={<EllipsisIcon />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <AppMenubarButtonLink
            to="/scenarios/settings"
            search={{ scenarioId }}
            icon={<PencilIcon />}
          >
            Редактировать
          </AppMenubarButtonLink>
          {isExportAvailable && scenarioVersionId && (
            <ScenarioAppMenubarExportSubmenu
              scenarioVersionId={scenarioVersionId}
              handleDropdownMenuClose={handleDropdownMenuClose}
            />
          )}
          <ScenarioAppMenubarDeleteDialog
            scenarioId={scenarioId}
            handleDropdownMenuClose={handleDropdownMenuClose}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
