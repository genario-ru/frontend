import { EllipsisIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type IdeasListIdeaCardSecondaryActionsMenuProps = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export function IdeasListIdeaCardSecondaryActionsMenu({
  isOpen,
  setIsOpen,
  children,
}: IdeasListIdeaCardSecondaryActionsMenuProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="tertiary" icon={<EllipsisIcon />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
