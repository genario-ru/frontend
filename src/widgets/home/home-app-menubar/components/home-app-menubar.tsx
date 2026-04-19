import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

import { HomeAppMenubarActions } from "./home-app-menubar-actions";

export function HomeAppMenubar() {
  const { isMobile } = useBreakpoints();

  return (
    <AppMenubar
      actions={isMobile && <AppDrawer />}
      title="Главная"
      right={<HomeAppMenubarActions />}
      className={cn({ "pl-3": isMobile })}
    />
  );
}
