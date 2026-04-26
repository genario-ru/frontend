import { ArrowUpRightIcon, CircleQuestionMarkIcon } from "lucide-react";

import { ProfilesImportIsland } from "@/features/profiles-import/profiles-import-island/components/profiles-import-island";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function ProfilesImportOtherPlatforms() {
  return (
    <ProfilesImportIsland
      icon={CircleQuestionMarkIcon}
      title="Что делать, если канал на другой платформе?"
      description="Ничего страшного, для этого просто перейдите в режим ручного создания профиля вашего канала"
    >
      <ButtonLink
        size="lg"
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
