import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ProfileSettingsAppMenubar } from "@/widgets/profile-settings/profile-settings-app-menubar/components/profile-settings-app-menubar";
import { ProfileSettingsReferences } from "@/widgets/profile-settings-references/components/profile-settings-references";

export function ProfileSettingsReferencesComponent() {
  const { profileId } = useSearch({
    from: "/_with-auth/_with-subscription/profiles/settings/references",
  });

  return (
    <PageLayout className="h-fit min-h-full pb-8">
      <ProfileSettingsAppMenubar profileId={profileId} />
      <ProfileSettingsReferences profileId={profileId} />
    </PageLayout>
  );
}
