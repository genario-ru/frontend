import { useMemo } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";

import { useProfileSettingsAppMenubar } from "../hooks/use-profile-settings-app-menubar";
import { ProfileSettingsAppMenubarTabs } from "./profile-settings-app-menubar-tabs";

type ProfileSettingsAppMenubarProps = {
  profileId?: string;
};

export function ProfileSettingsAppMenubar({
  profileId,
}: ProfileSettingsAppMenubarProps) {
  const { isMobile, title } = useProfileSettingsAppMenubar({ profileId });

  const right = useMemo(() => {
    if (!isMobile) {
      return <ProfileSettingsAppMenubarTabs profileId={profileId} />;
    }
  }, [isMobile, profileId]);

  const bottom = useMemo(() => {
    if (isMobile) {
      return <ProfileSettingsAppMenubarTabs profileId={profileId} expand />;
    }
  }, [isMobile, profileId]);

  return (
    <AppMenubar
      actions={<BackButton />}
      title={title}
      right={right}
      bottom={bottom}
    />
  );
}
