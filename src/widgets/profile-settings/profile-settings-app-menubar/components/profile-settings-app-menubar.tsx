import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";

type ProfileSettingsAppMenubarProps = {
  profileId?: string;
};

export function ProfileSettingsAppMenubar({
  profileId,
}: ProfileSettingsAppMenubarProps) {
  return (
    <AppMenubar
      actions={<BackButton />}
      title={profileId ? "Редактирование профиля" : "Новый профиль"}
    />
  );
}
