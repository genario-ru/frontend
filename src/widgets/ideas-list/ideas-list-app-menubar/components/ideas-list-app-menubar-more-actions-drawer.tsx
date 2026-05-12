import {
  EllipsisIcon,
  PencilIcon,
  TrashIcon,
  WandSparklesIcon,
} from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { SPACE } from "@/shared/constants/unicode";

import { useIdeasListAppMenubarDeleteIdeaDialog } from "../hooks/use-ideas-list-app-menubar-delete-idea-dialog";
import { useIdeasListAppMenubarExportSubmenu } from "../hooks/use-ideas-list-app-menubar-export-submenu";
import { useIdeasListAppMenubarMoreActions } from "../hooks/use-ideas-list-app-menubar-more-actions";
import { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";
import { IdeasListAppMenubarDeleteIdeaDialogDrawer } from "./ideas-list-app-menubar-delete-idea-drawer";
import { IdeasListAppMenubarMoreIdeasDialogDrawer } from "./ideas-list-app-menubar-more-ideas-drawer";

type IdeasListAppMenubarMoreActionsDrawerProps = {
  ideasListId: string;
  withMoreIdeasAction?: boolean;
};

export function IdeasListAppMenubarMoreActionsDrawer({
  ideasListId,
  withMoreIdeasAction = false,
}: IdeasListAppMenubarMoreActionsDrawerProps) {
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  } = useIdeasListAppMenubarMoreActions();
  const { exportJob, exportsData, handleCreateExport } =
    useIdeasListAppMenubarExportSubmenu({
      ideasListId,
      handleDropdownMenuClose,
    });
  const {
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useIdeasListAppMenubarDeleteIdeaDialog({
    ideasListId,
    handleDropdownMenuClose,
  });
  const {
    form,
    isMoreIdeasDialogOpen,
    isGenerateMoreIdeasPending,
    setIsMoreIdeasDialogOpen,
    onFormSubmit,
  } = useIdeasListAppMenubarMoreIdeasDialog({ ideasListId });

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
              to="/ideas-lists/settings"
              search={{ ideasListId }}
              icon={<PencilIcon />}
              className="w-full"
              onClick={handleDropdownMenuClose}
            >
              Редактировать
            </AppMenubarButtonLink>
            {withMoreIdeasAction && (
              <AppMenubarDropdownMenuButton
                icon={<WandSparklesIcon />}
                align="between"
                className="w-full"
                onClick={() => setIsMoreIdeasDialogOpen(true)}
              >
                Больше идей
              </AppMenubarDropdownMenuButton>
            )}
          </DrawerSection>
          {isExportAvailable && (
            <DrawerSection title="Экспорт">
              {exportsData?.data.map((exportData) => {
                const icon = exportData.formatIcon ? (
                  <LucideIcon icon={exportData.formatIcon} />
                ) : null;

                const isExportJobActive =
                  exportJob?.format === exportData.formatSlug;

                return (
                  <AppMenubarDropdownMenuButton
                    key={`ideas-list-export-button-${exportData.formatSlug}`}
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
      {withMoreIdeasAction && (
        <IdeasListAppMenubarMoreIdeasDialogDrawer
          form={form}
          isMoreIdeasDialogOpen={isMoreIdeasDialogOpen}
          isGenerateMoreIdeasPending={isGenerateMoreIdeasPending}
          setIsMoreIdeasDialogOpen={setIsMoreIdeasDialogOpen}
          onFormSubmit={onFormSubmit}
        />
      )}
      <IdeasListAppMenubarDeleteIdeaDialogDrawer
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeleteIdeasListPending={isDeleteIdeasListPending}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
      />
    </>
  );
}
