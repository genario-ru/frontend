import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfileSettings } from "@/widgets/profile-settings/profile-settings/components/profile-settings";
import { ProfileSettingsAppMenubar } from "@/widgets/profile-settings/profile-settings-app-menubar/components/profile-settings-app-menubar";

export function ProfileSettingsComponent() {
  const { profileId } = useSearch({
    from: "/_with-auth/_with-subscription/profiles/settings",
  });

  return (
    <>
      <ProfileSettingsAppMenubar profileId={profileId} />
      <PageLayout className="flex-1 pb-0">
        <ProfileSettings profileId={profileId} />
      </PageLayout>
    </>
  );
}
