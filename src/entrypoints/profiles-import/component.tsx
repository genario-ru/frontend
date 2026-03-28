import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfilesImport } from "@/widgets/profiles-import/profiles-import/components/profiles-import";
import { ProfilesImportAppMenubar } from "@/widgets/profiles-import/profiles-import-app-menubar/components/profiles-import-app-menubar";
import { ProfilesImportJobAlert } from "@/widgets/profiles-import-job/components/profiles-import-job-alert";

export function ProfilesImportComponent() {
  return (
    <>
      <ProfilesImportAppMenubar />
      <PageLayout className="flex-1 gap-4">
        <ProfilesImportJobAlert />
        <ProfilesImport />
      </PageLayout>
    </>
  );
}
