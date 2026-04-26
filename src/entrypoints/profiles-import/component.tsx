import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfilesImport } from "@/widgets/profiles-import/profiles-import/components/profiles-import";
import { ProfilesImportAppMenubar } from "@/widgets/profiles-import/profiles-import-app-menubar/components/profiles-import-app-menubar";
import { ProfilesImportJobAlert } from "@/widgets/profiles-import/profiles-import-job/components/profiles-import-job-alert";

export function ProfilesImportComponent() {
  return (
    <>
      <ProfilesImportAppMenubar />
      <PageLayout className="flex-1 gap-4 pb-2">
        <ProfilesImportJobAlert />
        <ProfilesImport />
      </PageLayout>
      <CommonFooter className="mt-auto" />
    </>
  );
}
