import {
  EllipsisIcon,
  PencilIcon,
  TrashIcon,
  WandSparklesIcon,
} from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useScenarioAppMenubarDeleteDialog } from "../hooks/use-scenario-app-menubar-delete-dialog";
import { useScenarioAppMenubarImproveDialog } from "../hooks/use-scenario-app-menubar-improve-dialog";
import { useScenarioAppMenubarMoreActions } from "../hooks/use-scenario-app-menubar-more-actions";
import { ScenarioAppMenubarDeleteDialog } from "./scenario-app-menubar-delete-dialog";
import { ScenarioAppMenubarExportSubmenu } from "./scenario-app-menubar-export-submenu";
import { ScenarioAppMenubarImproveDialog } from "./scenario-app-menubar-improve-dialog";
import { ScenarioAppMenubarStatusSubmenu } from "./scenario-app-menubar-status-submenu";
import { ScenarioAppMenubarVersionsSubmenu } from "./scenario-app-menubar-versions-submenu";

type ScenarioAppMenubarMoreActionsDropdownProps = {
  scenarioId: string;
  scenarioVersionId?: string;
  withImproveAction?: boolean;
};

export function ScenarioAppMenubarMoreActionsDropdown({
  scenarioId,
  scenarioVersionId,
  withImproveAction = false,
}: ScenarioAppMenubarMoreActionsDropdownProps) {
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    isVersionHistoryAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  } = useScenarioAppMenubarMoreActions();
  const {
    form,
    isImproveDialogOpen,
    isImproveDialogPending,
    setIsImproveDialogOpen,
    onFormSubmit,
  } = useScenarioAppMenubarImproveDialog({ scenarioId });
  const {
    isDeleteDialogOpen,
    isDeleteScenarioPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useScenarioAppMenubarDeleteDialog({
    scenarioId,
    handleDropdownMenuClose,
  });

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
              trigger={
                <Button
                  priority="tertiary"
                  icon={<WandSparklesIcon />}
                  align="between"
                  className="w-full"
                >
                  Улучшить
                </Button>
              }
              form={form}
              isImproveDialogOpen={isImproveDialogOpen}
              isImproveDialogPending={isImproveDialogPending}
              setIsImproveDialogOpen={setIsImproveDialogOpen}
              onFormSubmit={onFormSubmit}
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
            trigger={
              <AppMenubarDropdownMenuButton
                variant="negative"
                icon={<TrashIcon />}
              >
                Удалить
              </AppMenubarDropdownMenuButton>
            }
            isDeleteDialogOpen={isDeleteDialogOpen}
            isDeleteScenarioPending={isDeleteScenarioPending}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
