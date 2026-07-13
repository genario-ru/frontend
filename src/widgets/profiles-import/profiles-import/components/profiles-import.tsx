import { Island } from "@/shared/components/ui/island";

import { ProfilesImportFeatures } from "../../profiles-import-features/components/profiles-import-features";
import { ProfilesImportForm } from "../../profiles-import-form/components/profiles-import-form";
import { ProfilesImportOtherPlatforms } from "../../profiles-import-other-platforms/components/profiles-import-other-platforms";
import { ProfilesImportPlatformsList } from "../../profiles-import-platforms-list/components/profiles-import-platforms-list";

export function ProfilesImport() {
  return (
    <Island
      grow
      title="Ссылки на ваши каналы"
      description="Добавьте ссылки на каналы YouTube, Instagram или TikTok, которые хотите использовать в Genario. Мы проверим их и поможем создать профили для дальнейшей персонализации идей, сценариев и метаданных."
    >
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <section className="flex flex-1 flex-col gap-4">
          <ProfilesImportForm />
          <ProfilesImportFeatures />
        </section>
        <section className="flex flex-1 flex-col gap-4">
          <ProfilesImportPlatformsList />
          <ProfilesImportOtherPlatforms />
        </section>
      </div>
    </Island>
  );
}
