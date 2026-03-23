import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfilesImport } from "@/widgets/profiles-import/profiles-import/components/profiles-import";
import { ProfilesImportAppMenubar } from "@/widgets/profiles-import/profiles-import-app-menubar/components/profiles-import-app-menubar";

export function ProfilesImportComponent() {
  return (
    <>
      <ProfilesImportAppMenubar />
      <PageLayout className="flex-1">
        <ProfilesImport />
      </PageLayout>
    </>
  );
}
