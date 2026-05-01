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
import { ScenarioAppMenubarImproveDialog } from "./scenario-app-menubar-improve-dialog";
import { ScenarioAppMenubarStatusSubmenu } from "./scenario-app-menubar-status-submenu";
import { ScenarioAppMenubarVersionsSubmenu } from "./scenario-app-menubar-versions-submenu";

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
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    isVersionHistoryAvailable,
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
          {withImproveAction && (
            <ScenarioAppMenubarImproveDialog
              scenarioId={scenarioId}
              triggerProps={{
                align: "between",
                className: "w-full",
              }}
            />
          )}
          <ScenarioAppMenubarStatusSubmenu
            scenarioId={scenarioId}
            handleDropdownMenuClose={handleDropdownMenuClose}
          />
          {isVersionHistoryAvailable && (
            <ScenarioAppMenubarVersionsSubmenu scenarioId={scenarioId} />
          )}
          {isExportAvailable && scenarioVersionId && (
            <ScenarioAppMenubarExportSubmenu
              scenarioId={scenarioId}
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
