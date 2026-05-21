import { ArrowUpRightIcon, CircleQuestionMarkIcon } from "lucide-react";

import { ProfilesImportIsland } from "@/features/profiles-import/profiles-import-island/components/profiles-import-island";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function ProfilesImportOtherPlatforms() {
  return (
    <ProfilesImportIsland
      icon={CircleQuestionMarkIcon}
      title="Что делать, если канал на другой платформе?"
      description="Если импорт для вашей платформы пока недоступен, создайте профиль канала вручную и заполните нужные данные самостоятельно."
    >
      <ButtonLink
        to="/profiles/settings"
        priority="tertiary"
        icon={<ArrowUpRightIcon />}
        align="center"
        className="w-full"
      >
        К ручному созданию
      </ButtonLink>
    </ProfilesImportIsland>
  );
}
