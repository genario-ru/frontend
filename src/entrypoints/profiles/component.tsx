import { CreateProfileButton } from "@/features/profiles/profile-app-menubar/components/create-profile-button";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { MyProfilesList } from "@/widgets/profiles/my-profiles-list/components/my-profiles-list";
import { ProfileDialog } from "@/widgets/profiles/profile-dialog/components/profile-dialog";
import { ProfilesAppMenubar } from "@/widgets/profiles/profiles-app-menubar/components/profiles-app-menubar";

export function ProfilesComponent() {
  return (
    <>
      <ProfilesAppMenubar
        newProfileDialog={<ProfileDialog trigger={<CreateProfileButton />} />}
      />
      <PageLayout>
        <MyProfilesList />
      </PageLayout>
    </>
  );
}
