import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

type ProfileSettingsAppMenubarProps = {
  profileId?: string;
};

export function ProfileSettingsAppMenubar({
  profileId,
}: ProfileSettingsAppMenubarProps) {
  return (
    <AppMenubar
      backButton
      title={profileId ? "Редактирование профиля" : "Новый профиль"}
      description="Введите всю релевантную информацию о вашем профиле / канале, которая будет полезна при генерации контента"
    />
  );
}
