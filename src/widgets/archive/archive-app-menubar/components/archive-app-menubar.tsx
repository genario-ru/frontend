import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

import { ArchiveAppMenubarActions } from "./archive-app-menubar-actions";

type ArchiveAppMenubarProps = {
  filters: ReactNode;
};

export function ArchiveAppMenubar({ filters }: ArchiveAppMenubarProps) {
  return (
    <AppMenubar
      title="Архив"
      left={filters}
      right={<ArchiveAppMenubarActions />}
    />
  );
}
