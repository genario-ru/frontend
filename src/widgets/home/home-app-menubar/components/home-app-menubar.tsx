import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

import { HomeAppMenubarActions } from "./home-app-menubar-actions";

export function HomeAppMenubar() {
  return <AppMenubar title="Главная" right={<HomeAppMenubarActions />} />;
}
