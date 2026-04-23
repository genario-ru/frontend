import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";

type IdeasListSettingsAppMenubarProps = {
  ideasListId?: string;
};

export function IdeasListSettingsAppMenubar({
  ideasListId,
}: IdeasListSettingsAppMenubarProps) {
  return (
    <AppMenubar
      actions={<BackButton />}
      title={ideasListId ? "Настройки списка идей" : "Новый список идей"}
    />
  );
}
