import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";

export function IdeasListSettingsAppMenubar() {
  return <AppMenubar actions={<BackButton />} title="Настройки списка идей" />;
}
