import {
  EllipsisIcon,
  PencilIcon,
  TrashIcon,
  WandSparklesIcon,
} from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import { ScenarioVersionRadioIndicator } from "@/features/scenario/scenario-app-menubar/components/scenario-version-radio-indicator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { SPACE } from "@/shared/constants/unicode";

import { useScenarioAppMenubarDeleteDialog } from "../hooks/use-scenario-app-menubar-delete-dialog";
import { useScenarioAppMenubarExportSubmenu } from "../hooks/use-scenario-app-menubar-export-submenu";
import { useScenarioAppMenubarImproveDialog } from "../hooks/use-scenario-app-menubar-improve-dialog";
import { useScenarioAppMenubarMoreActions } from "../hooks/use-scenario-app-menubar-more-actions";
import { useScenarioAppMenubarStatusSubmenu } from "../hooks/use-scenario-app-menubar-status-submenu";
import { useScenarioAppMenubarVersionsSubmenu } from "../hooks/use-scenario-app-menubar-versions-submenu";
import { ScenarioAppMenubarDeleteDialogDrawer } from "./scenario-app-menubar-delete-drawer";
import { ScenarioAppMenubarImproveDialogDrawer } from "./scenario-app-menubar-improve-drawer";

type ScenarioAppMenubarMoreActionsDrawerProps = {
  scenarioId: string;
  scenarioVersionId?: string;
  withImproveAction?: boolean;
};

export function ScenarioAppMenubarMoreActionsDrawer({
  scenarioId,
  scenarioVersionId,
  withImproveAction = false,
}: ScenarioAppMenubarMoreActionsDrawerProps) {
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    isVersionHistoryAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  } = useScenarioAppMenubarMoreActions();

  const {
    productionStatuses,
    activeProductionStatus,
    isUpdateScenarioPending,
    handleSelectStatus,
  } = useScenarioAppMenubarStatusSubmenu({
    scenarioId,
    handleDropdownMenuClose,
  });

  const { versionItems, activeVersionId } =
    useScenarioAppMenubarVersionsSubmenu({ scenarioId });
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
    <>
      <Drawer open={isDropdownMenuOpen} onOpenChange={setIsDropdownMenuOpen}>
        <DrawerTrigger
          render={
            <AppMenubarButton priority="tertiary" icon={<EllipsisIcon />} />
          }
        />
        <DrawerContent>
          <DrawerHeader title="Действия" />
          <DrawerSection title="Основное">
            <AppMenubarButtonLink
              to="/scenarios/settings"
              search={{ scenarioId }}
              icon={<PencilIcon />}
              className="w-full"
              onClick={handleDropdownMenuClose}
            >
              Редактировать
            </AppMenubarButtonLink>
            {withImproveAction && (
              <AppMenubarDropdownMenuButton
                icon={<WandSparklesIcon />}
                align="between"
                className="w-full"
                onClick={() => setIsImproveDialogOpen(true)}
              >
                Улучшить
              </AppMenubarDropdownMenuButton>
            )}
          </DrawerSection>
          <DrawerSection title="Статус">
            {productionStatuses.map((status) => {
              const isActive = status.id === activeProductionStatus?.id;

              return (
                <AppMenubarDropdownMenuButton
                  key={status.id}
                  priority="tertiary"
                  iconPosition="left"
                  align="start"
                  className="w-full"
                  icon={<ScenarioVersionRadioIndicator checked={isActive} />}
                  disabled={isUpdateScenarioPending}
                  onClick={() => handleSelectStatus(status.id)}
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
          </DrawerSection>
          {isVersionHistoryAvailable && (
            <DrawerSection title="Версии">
              {versionItems.map((version) => (
                <AppMenubarButtonLink
                  key={version.id}
                  to="/scenarios/$scenarioId"
                  params={{ scenarioId }}
                  search={(prev) => ({ ...prev, versionId: version.id })}
                  align="start"
                  iconPosition="left"
                  className="w-full"
                  icon={
                    <ScenarioVersionRadioIndicator
                      checked={version.id === activeVersionId}
                    />
                  }
                  onClick={handleDropdownMenuClose}
                >
                  {version.label}
                </AppMenubarButtonLink>
              ))}
            </DrawerSection>
          )}
          {isExportAvailable && scenarioVersionId && (
            <ScenarioAppMenubarDrawerExportActions
              scenarioId={scenarioId}
              scenarioVersionId={scenarioVersionId}
              handleDropdownMenuClose={handleDropdownMenuClose}
            />
          )}
          <DrawerSection title="Опасно" roundedBottom={false}>
            <AppMenubarDropdownMenuButton
              variant="negative"
              icon={<TrashIcon />}
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Удалить
            </AppMenubarDropdownMenuButton>
          </DrawerSection>
        </DrawerContent>
      </Drawer>
      {withImproveAction && (
        <ScenarioAppMenubarImproveDialogDrawer
          form={form}
          isImproveDialogOpen={isImproveDialogOpen}
          isImproveDialogPending={isImproveDialogPending}
          setIsImproveDialogOpen={setIsImproveDialogOpen}
          onFormSubmit={onFormSubmit}
        />
      )}
      <ScenarioAppMenubarDeleteDialogDrawer
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeleteScenarioPending={isDeleteScenarioPending}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
      />
    </>
  );
}

function ScenarioAppMenubarDrawerExportActions({
  scenarioId,
  scenarioVersionId,
  handleDropdownMenuClose,
}: {
  scenarioId: string;
  scenarioVersionId: string;
  handleDropdownMenuClose: () => void;
}) {
  const { exportJob, exportsData, handleCreateExport } =
    useScenarioAppMenubarExportSubmenu({
      scenarioId,
      scenarioVersionId,
      handleDropdownMenuClose,
    });

  return (
    <DrawerSection title="Экспорт">
      {exportsData?.data.map((exportData) => {
        const icon = exportData.formatIcon ? (
          <LucideIcon icon={exportData.formatIcon} />
        ) : null;

        const isExportJobActive = exportJob?.format === exportData.formatSlug;

        return (
          <AppMenubarDropdownMenuButton
            key={`scenario-export-button-${exportData.formatSlug}`}
            icon={icon}
            iconColor={exportData.formatColor}
            state={isExportJobActive ? "loading" : "default"}
            onClick={() => {
              handleDropdownMenuClose();
              handleCreateExport(exportData.formatSlug);
            }}
          >
            Скачать{SPACE}
            {exportData.formatName}
          </AppMenubarDropdownMenuButton>
        );
      })}
    </DrawerSection>
  );
}
