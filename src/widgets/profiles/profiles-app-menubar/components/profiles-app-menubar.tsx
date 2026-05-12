import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

import { ProfilesAppMenubarDrawerActions } from "./profiles-app-menubar-drawer-actions";
import { ProfilesAppMenubarDropdownActions } from "./profiles-app-menubar-dropdown-actions";

export function ProfilesAppMenubar() {
  const { isMobile } = useBreakpoints();

  return (
    <AppMenubar
      actions={isMobile && <AppDrawer />}
      title="Профили"
      right={
        isMobile ? (
          <ProfilesAppMenubarDrawerActions />
        ) : (
          <ProfilesAppMenubarDropdownActions />
        )
      }
    />
  );
}
