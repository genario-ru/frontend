import type { PropsWithChildren } from "react";

import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { IdeasListIdeaCardSecondaryActionsMenuDrawer } from "./ideas-list-idea-card-secondary-actions-menu-drawer";
import { IdeasListIdeaCardSecondaryActionsMenuDropdown } from "./ideas-list-idea-card-secondary-actions-menu-dropdown";

type IdeasListIdeaCardSecondaryActionsMenuProps = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export function IdeasListIdeaCardSecondaryActionsMenu({
  isOpen,
  setIsOpen,
  children,
}: IdeasListIdeaCardSecondaryActionsMenuProps) {
  const { isMobile } = useBreakpoints();

  if (isMobile) {
    return (
      <IdeasListIdeaCardSecondaryActionsMenuDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {children}
      </IdeasListIdeaCardSecondaryActionsMenuDrawer>
    );
  }

  return (
    <IdeasListIdeaCardSecondaryActionsMenuDropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </IdeasListIdeaCardSecondaryActionsMenuDropdown>
  );
}
