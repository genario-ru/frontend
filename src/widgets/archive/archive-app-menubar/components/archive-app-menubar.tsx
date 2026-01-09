import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

type ArchiveAppMenubarProps = {
  filters: ReactNode;
  actions: ReactNode;
};

export function ArchiveAppMenubar({
  filters,
  actions,
}: ArchiveAppMenubarProps) {
  return <AppMenubar title="Архив" left={filters} right={actions} />;
}
