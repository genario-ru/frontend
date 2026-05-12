import { EllipsisIcon, PencilIcon, TrashIcon, WandSparklesIcon } from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useIdeasListAppMenubarDeleteIdeaDialog } from "../hooks/use-ideas-list-app-menubar-delete-idea-dialog";
import { useIdeasListAppMenubarMoreActions } from "../hooks/use-ideas-list-app-menubar-more-actions";
import { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";
import { IdeasListAppMenubarDeleteIdeaDialog } from "./ideas-list-app-menubar-delete-idea-dialog";
import { IdeasListAppMenubarExportSubmenu } from "./ideas-list-app-menubar-export-submenu";
import { IdeasListAppMenubarMoreIdeasDialog } from "./ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarMoreActionsDropdownProps = {
  ideasListId: string;
  withMoreIdeasAction?: boolean;
};

export function IdeasListAppMenubarMoreActionsDropdown({
  ideasListId,
  withMoreIdeasAction = false,
}: IdeasListAppMenubarMoreActionsDropdownProps) {
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  } = useIdeasListAppMenubarMoreActions();
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
            to="/ideas-lists/settings"
            search={{ ideasListId }}
            icon={<PencilIcon />}
          >
            Редактировать
          </AppMenubarButtonLink>
          {withMoreIdeasAction && (
            <IdeasListAppMenubarMoreIdeasDialog
              trigger={
                <AppMenubarButton
                  icon={<WandSparklesIcon />}
                  align="between"
                  className="w-full"
                >
                  Больше идей
                </AppMenubarButton>
              }
              form={form}
              isMoreIdeasDialogOpen={isMoreIdeasDialogOpen}
              isGenerateMoreIdeasPending={isGenerateMoreIdeasPending}
              setIsMoreIdeasDialogOpen={setIsMoreIdeasDialogOpen}
              onFormSubmit={onFormSubmit}
            />
          )}
          {isExportAvailable && (
            <IdeasListAppMenubarExportSubmenu
              ideasListId={ideasListId}
              handleDropdownMenuClose={handleDropdownMenuClose}
            />
          )}
          <IdeasListAppMenubarDeleteIdeaDialog
            trigger={
              <AppMenubarDropdownMenuButton variant="negative" icon={<TrashIcon />}>
                Удалить
              </AppMenubarDropdownMenuButton>
            }
            isDeleteDialogOpen={isDeleteDialogOpen}
            isDeleteIdeasListPending={isDeleteIdeasListPending}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
