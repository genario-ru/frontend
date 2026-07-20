import { ProfilesImportProcess } from "@/features/profiles-import/profiles-import-process/components/profiles-import-process";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";

import { ProfilesImportForm } from "../../profiles-import-form/components/profiles-import-form";
import { ProfilesImportOtherPlatforms } from "../../profiles-import-other-platforms/components/profiles-import-other-platforms";
import { ProfilesImportSupportedPlatforms } from "../../profiles-import-supported-platforms/components/profiles-import-supported-platforms";

export function ProfilesImport() {
  return (
    <ContentLayout className="isolate grid lg:grid-cols-5">
      <Island
        grow
        title="Ссылки на ваши каналы"
        description="Добавьте ссылки на каналы, которые хотите использовать в Genario. Мы проверим их и поможем создать профили для дальнейшей персонализации идей, сценариев и метаданных."
        className="gap-6 lg:col-span-3 lg:flex-1"
      >
        <ProfilesImportForm />
        <ProfilesImportSupportedPlatforms />
        <ProfilesImportOtherPlatforms />
      </Island>
      <ProfilesImportProcess className="lg:col-span-2" />
    </ContentLayout>
  );
}
