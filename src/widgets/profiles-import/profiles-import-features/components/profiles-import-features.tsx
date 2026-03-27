import { ZapIcon } from "lucide-react";

import { ProfilesImportFeaturesList } from "@/features/profiles-import/profiles-import-features/components/profiles-import-features-list";
import { ProfilesImportIsland } from "@/features/profiles-import/profiles-import-island/components/profiles-import-island";

export function ProfilesImportFeatures() {
  return (
    <ProfilesImportIsland
      icon={ZapIcon}
      title="Укажите ссылки, а мы создадим профили"
    >
      <ProfilesImportFeaturesList />
    </ProfilesImportIsland>
  );
}
