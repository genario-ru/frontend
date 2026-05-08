import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfilesImport } from "@/widgets/profiles-import/profiles-import/components/profiles-import";
import { ProfilesImportAppMenubar } from "@/widgets/profiles-import/profiles-import-app-menubar/components/profiles-import-app-menubar";
import { ProfilesImportJobAlert } from "@/widgets/profiles-import/profiles-import-job/components/profiles-import-job-alert";

export function ProfilesImportComponent() {
  return (
    <PageLayout className="h-fit min-h-full">
      <ProfilesImportAppMenubar />
      <ProfilesImportJobAlert />
      <ProfilesImport />
      <CommonFooter className="mt-auto" />
    </PageLayout>
  );
}
