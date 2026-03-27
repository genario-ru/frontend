import { ImportIcon } from "lucide-react";
import { useMemo } from "react";

import { ProfilesImportIsland } from "@/features/profiles-import/profiles-import-island/components/profiles-import-island";
import {
  ProfilesImportPlatformsListItem,
  ProfilesImportPlatformsListItemSkeleton,
} from "@/features/profiles-import/profiles-import-platforms-list/components/profiles-import-platforms-list-item";
import { ItemsList } from "@/shared/components/common/items-list";
import { Plug } from "@/shared/components/ui/plug";

import { useProfilesImportPlatformsList } from "../hooks/use-profiles-import-platforms-list";

export function ProfilesImportPlatformsList() {
  const { profileChannelPlatformsData, isProfileChannelPlatformsLoading } =
    useProfilesImportPlatformsList();

  const body = useMemo(() => {
    if (isProfileChannelPlatformsLoading) {
      return <ProfilesImportPlatformsListSkeleton />;
    }

    if (!profileChannelPlatformsData?.data.length) {
      return (
        <Plug
          title="Нет доступных платформ"
          description="На данный момент нет доступных платформ для импорта"
        />
      );
    }

    return profileChannelPlatformsData.data.map((platform) => (
      <ProfilesImportPlatformsListItem
        key={platform.id}
        name={platform.name}
        description={platform.description}
        logoUrl={platform.logoUrl}
      />
    ));
  }, [profileChannelPlatformsData, isProfileChannelPlatformsLoading]);

  return (
    <ProfilesImportIsland
      icon={ImportIcon}
      title="Платформы с поддержкой импорта"
    >
      {body}
    </ProfilesImportIsland>
  );
}

export function ProfilesImportPlatformsListSkeleton() {
  return (
    <ItemsList
      noParent
      count={3}
      item={<ProfilesImportPlatformsListItemSkeleton />}
    />
  );
}
