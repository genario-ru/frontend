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
      description="Описание сценария, где будет описываться описание сценария, в котором мы опишем сам сценари, писие сценария, где будет описываться описание сценар..."
    >
      <div className="flex w-full gap-8">
        <section className="flex flex-1 flex-col gap-6">
          <ProfilesImportForm />
          <ProfilesImportFeatures />
        </section>
        <section className="flex flex-1 flex-col gap-6">
          <ProfilesImportPlatformsList />
          <ProfilesImportOtherPlatforms />
        </section>
      </div>
    </Island>
  );
}
