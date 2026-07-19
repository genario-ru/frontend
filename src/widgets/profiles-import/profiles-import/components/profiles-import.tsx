import { ProfilesImportProcess } from "@/features/profiles-import/profiles-import-process/components/profiles-import-process";
import { Island } from "@/shared/components/ui/island";

import { ProfilesImportForm } from "../../profiles-import-form/components/profiles-import-form";
import { ProfilesImportOtherPlatforms } from "../../profiles-import-other-platforms/components/profiles-import-other-platforms";
import { ProfilesImportPlatformsFan } from "../../profiles-import-platforms-fan/components/profiles-import-platforms-fan";

export function ProfilesImport() {
  return (
    <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-stretch">
      <Island
        grow
        title="Ссылки на ваши каналы"
        description="Добавьте ссылки на каналы, которые хотите использовать в Genario. Мы проверим их и поможем создать профили для дальнейшей персонализации идей, сценариев и метаданных."
        actions={<ProfilesImportPlatformsFan />}
        className="gap-6 lg:flex-1"
      >
        <ProfilesImportForm />
        <ProfilesImportOtherPlatforms />
      </Island>
      <ProfilesImportProcess />
    </div>
  );
}
