import { ChevronRightIcon } from "lucide-react";

import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import {
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { SPACE } from "@/shared/constants/unicode";

import { useScenarioAppMenubarExportSubmenu } from "../hooks/use-scenario-app-menubar-export-submenu";

type ScenarioAppMenubarExportSubmenuProps = {
  scenarioId: string;
  scenarioVersionId: string;
  handleDropdownMenuClose: () => void;
};

export function ScenarioAppMenubarExportSubmenu({
  scenarioId,
  scenarioVersionId,
  handleDropdownMenuClose,
}: ScenarioAppMenubarExportSubmenuProps) {
  const { exportJob, exportsData, handleCreateExport } =
    useScenarioAppMenubarExportSubmenu({
      scenarioId,
      scenarioVersionId,
      handleDropdownMenuClose,
    });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger asChild>
        <AppMenubarDropdownMenuButton icon={<ChevronRightIcon />}>
          Экспорт
        </AppMenubarDropdownMenuButton>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuGroup>
          {exportsData?.data.map((exportData) => {
            const icon = exportData.formatIcon ? (
              <LucideIcon icon={exportData.formatIcon} />
            ) : null;

            const isExportJobActive =
              exportJob?.format === exportData.formatSlug;

            const handleCreateExportClick = () => {
              handleCreateExport(exportData.formatSlug);
            };

            return (
              <AppMenubarDropdownMenuButton
                key={`scenario-export-button-${exportData.formatSlug}`}
                icon={icon}
                iconColor={exportData.formatColor}
                state={isExportJobActive ? "loading" : "default"}
                onClick={handleCreateExportClick}
              >
                Скачать{SPACE}
                {exportData.formatName}
              </AppMenubarDropdownMenuButton>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
