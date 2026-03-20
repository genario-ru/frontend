import { useMemo } from "react";

import type { ProfileSettingsSearch } from "@/routes/_with-auth/_with-subscription/profiles/settings";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useProfileSettings } from "../hooks/use-profile-settings";
import {
  ProfileSettingsForm,
  ProfileSettingsFormErrorPlug,
  ProfileSettingsFormNotEnoughDataPlug,
  ProfileSettingsFormSkeleton,
} from "./profile-settings-form";

type ProfileSettingsProps = ProfileSettingsSearch;

export function ProfileSettings({ profileId }: ProfileSettingsProps) {
  const {
    profileData,
    profileTypesData,
    tonesData,
    platformsData,
    isLoading,
    isError,
  } = useProfileSettings({ profileId });

  const body = useMemo(() => {
    if (isLoading) {
      return <ProfileSettingsFormSkeleton />;
    }

    if (isError) {
      return <ProfileSettingsFormErrorPlug />;
    }

    if (!profileTypesData || !tonesData || !platformsData) {
      return <ProfileSettingsFormNotEnoughDataPlug />;
    }

    return (
      <ProfileSettingsForm
        profileData={profileData}
        profileTypesData={profileTypesData}
        tonesData={tonesData}
        platformsData={platformsData}
      />
    );
  }, [
    isLoading,
    isError,
    profileData,
    profileTypesData,
    tonesData,
    platformsData,
  ]);

  return (
    <ContentLayout size="md" className="flex-1">
      {body}
    </ContentLayout>
  );
}
