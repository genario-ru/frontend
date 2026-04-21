import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

import { ArchiveAppMenubarActions } from "./archive-app-menubar-actions";

type ArchiveAppMenubarProps = {
  search: ReactNode;
  filters: ReactNode;
};

export function ArchiveAppMenubar({ search, filters }: ArchiveAppMenubarProps) {
  const { isMobile } = useBreakpoints();

  return (
    <AppMenubar
      actions={isMobile && <AppDrawer />}
      title="Архив"
      center={search}
      right={<ArchiveAppMenubarActions />}
      bottom={filters}
    />
  );
}
