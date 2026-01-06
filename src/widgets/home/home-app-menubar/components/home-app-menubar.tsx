import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

type HomeAppMenubarProps = {
  actions: ReactNode;
};

export function HomeAppMenubar({ actions }: HomeAppMenubarProps) {
  return <AppMenubar title="Главная" right={actions} />;
}
