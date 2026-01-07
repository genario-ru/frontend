import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

type ArchiveAppMenubarProps = {
  filters: ReactNode;
};

export function ArchiveAppMenubar({ filters }: ArchiveAppMenubarProps) {
  return <AppMenubar title="Архив" left={filters} />;
}
