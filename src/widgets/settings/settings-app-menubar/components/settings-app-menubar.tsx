import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

export function SettingsAppMenubar() {
  const { isMobile } = useBreakpoints();

  return <AppMenubar actions={isMobile && <AppDrawer />} title="Настройки" />;
}
