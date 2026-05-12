import { EllipsisIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type IdeasListIdeaCardSecondaryActionsMenuDropdownProps = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export function IdeasListIdeaCardSecondaryActionsMenuDropdown({
  isOpen,
  setIsOpen,
  children,
}: IdeasListIdeaCardSecondaryActionsMenuDropdownProps) {
  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button priority="tertiary" icon={<EllipsisIcon />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
