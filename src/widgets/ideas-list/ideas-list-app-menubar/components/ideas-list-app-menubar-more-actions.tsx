import { EllipsisIcon, PencilIcon } from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { AppMenubarButtonLink } from "@/features/navigation/app-menubar/components/app-menubar-button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useIdeasListAppMenubarMoreActions } from "../hooks/use-ideas-list-app-menubar-more-actions";
import { IdeasListAppMenubarDeleteIdeaDialog } from "./ideas-list-app-menubar-delete-idea-dialog";
import { IdeasListAppMenubarExportSubmenu } from "./ideas-list-app-menubar-export-submenu";
import { IdeasListAppMenubarMoreIdeasDialog } from "./ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarMoreActionsProps = {
  ideasListId: string;
  withMoreIdeasAction?: boolean;
};

export function IdeasListAppMenubarMoreActions({
  ideasListId,
  withMoreIdeasAction = false,
}: IdeasListAppMenubarMoreActionsProps) {
  const {
    isDropdownMenuOpen,
    isExportAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  } = useIdeasListAppMenubarMoreActions();

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
              ideasListId={ideasListId}
              triggerProps={{
                align: "between",
                className: "w-full",
              }}
            />
          )}
          {isExportAvailable && (
            <IdeasListAppMenubarExportSubmenu
              ideasListId={ideasListId}
              handleDropdownMenuClose={handleDropdownMenuClose}
            />
          )}
          <IdeasListAppMenubarDeleteIdeaDialog
            ideasListId={ideasListId}
            handleDropdownMenuClose={handleDropdownMenuClose}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
