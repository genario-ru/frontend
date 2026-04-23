import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

import { ArchiveAppMenubarActions } from "./archive-app-menubar-actions";

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
  return (
    <AppMenubar
      title="Архив"
      wrapCenter={wrapCenter}
      actions={actions}
      center={search}
      right={<ArchiveAppMenubarActions />}
      bottom={filters}
      className="overflow-hidden"
    />
  );
}
