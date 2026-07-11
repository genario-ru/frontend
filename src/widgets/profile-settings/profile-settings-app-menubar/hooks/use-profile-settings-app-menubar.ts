import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type UseProfileSettingsAppMenubarParams = {
  profileId?: string;
};

export function useProfileSettingsAppMenubar({
  profileId,
}: UseProfileSettingsAppMenubarParams) {
  const { isMobile } = useBreakpoints();

  return {
    isMobile,
    title: profileId ? "Редактирование профиля" : "Новый профиль",
  };
}
