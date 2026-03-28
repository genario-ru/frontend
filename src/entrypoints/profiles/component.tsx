import { PageLayout } from "@/shared/components/layouts/page-layout";
import { MyProfilesList } from "@/widgets/profiles/my-profiles-list/components/my-profiles-list";
import { ProfilesAppMenubar } from "@/widgets/profiles/profiles-app-menubar/components/profiles-app-menubar";
import { ProfilesImportJobAlert } from "@/widgets/profiles-import-job/components/profiles-import-job-alert";

export function ProfilesComponent() {
  return (
    <>
      <ProfilesAppMenubar />
      <PageLayout className="flex-1 gap-4">
        <ProfilesImportJobAlert />
        <MyProfilesList />
      </PageLayout>
    </>
  );
}
