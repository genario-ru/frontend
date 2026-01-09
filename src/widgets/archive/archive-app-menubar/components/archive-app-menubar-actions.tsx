import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type ArchiveAppMenubarActionsProps = {
  newIdeasListDialog: ReactNode;
  newTemplateDialog: ReactNode;
};

export function ArchiveAppMenubarActions({
  newIdeasListDialog,
  newTemplateDialog,
}: ArchiveAppMenubarActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" icon={<ChevronDownIcon />}>
          Создать
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>{newIdeasListDialog}</DropdownMenuItem>
          <DropdownMenuItem asChild>{newTemplateDialog}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
