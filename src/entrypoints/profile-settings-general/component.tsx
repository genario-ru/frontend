import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfileSettingsAppMenubar } from "@/widgets/profile-settings/profile-settings-app-menubar/components/profile-settings-app-menubar";
import { ProfileSettingsGeneral } from "@/widgets/profile-settings-general/components/profile-settings-general";

export function ProfileSettingsGeneralComponent() {
  const { profileId } = useSearch({
    from: "/_with-auth/_with-subscription/profiles/settings/",
  });

  return (
    <PageLayout className="h-fit min-h-full pb-8">
      <ProfileSettingsAppMenubar profileId={profileId} />
      <ProfileSettingsGeneral profileId={profileId} />
    </PageLayout>
  );
}
