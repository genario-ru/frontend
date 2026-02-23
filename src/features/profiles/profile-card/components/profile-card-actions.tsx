import { EllipsisIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type ProfileCardActionsProps = {
  editDialog: ReactNode;
  deleteDialog: ReactNode;
};

export const ProfileCardActions = ({
  editDialog,
  deleteDialog,
}: ProfileCardActionsProps) => {
  const [isDropdownMenuOpened, setIsDropdownMenuOpened] = useState(false);

  return (
    <DropdownMenu
      modal={false}
      open={isDropdownMenuOpened}
      onOpenChange={setIsDropdownMenuOpened}
    >
      <DropdownMenuTrigger asChild>
        <Button size="sm" priority="tertiary" icon={<EllipsisIcon />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>{editDialog}</DropdownMenuItem>
          <DropdownMenuItem asChild>{deleteDialog}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
