import { useMemo } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

import { HomeAppMenubarDrawerActions } from "./home-app-menubar-drawer-actions";
import { HomeAppMenubarDropdownActions } from "./home-app-menubar-dropdown-actions";

export function HomeAppMenubar() {
  const { isMobile } = useBreakpoints();

  const right = useMemo(() => {
    if (isMobile) {
      return <HomeAppMenubarDrawerActions />;
    }

    return <HomeAppMenubarDropdownActions />;
  }, [isMobile]);

  return (
    <AppMenubar
      actions={isMobile && <AppDrawer />}
      title="Главная"
      right={right}
    />
  );
}
