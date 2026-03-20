import { PageLayout } from "@/shared/components/layouts/page-layout";
import { MyProfilesList } from "@/widgets/profiles/my-profiles-list/components/my-profiles-list";
import { ProfilesAppMenubar } from "@/widgets/profiles/profiles-app-menubar/components/profiles-app-menubar";

export function ProfilesComponent() {
  return (
    <>
      <ProfilesAppMenubar />
      <PageLayout>
        <MyProfilesList />
      </PageLayout>
    </>
  );
}
