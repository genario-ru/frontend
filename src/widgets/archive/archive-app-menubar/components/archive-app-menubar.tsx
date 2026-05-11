import { type ReactNode, useMemo } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { ArchiveAppMenubarDrawerActions } from "./archive-app-menubar-drawer-actions";
import { ArchiveAppMenubarDropdownActions } from "./archive-app-menubar-dropdown-actions";

type ArchiveAppMenubarProps = {
  actions: ReactNode;
  search: ReactNode;
  filters: ReactNode;
  wrapCenter?: boolean;
};

export function ArchiveAppMenubar({
  actions,
  search,
  filters,
  wrapCenter,
}: ArchiveAppMenubarProps) {
  const { isMobile } = useBreakpoints();

  const right = useMemo(() => {
    if (isMobile) {
      return <ArchiveAppMenubarDrawerActions />;
    }

    return <ArchiveAppMenubarDropdownActions />;
  }, [isMobile]);

  return (
    <AppMenubar
      title="Архив"
      wrapCenter={wrapCenter}
      actions={actions}
      center={search}
      right={right}
      bottom={filters}
      className="overflow-hidden"
    />
  );
}
