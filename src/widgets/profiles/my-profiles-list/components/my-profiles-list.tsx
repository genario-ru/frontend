import { useMemo } from "react";

import { ProfileCard } from "@/features/profiles/profile-card/components/profile-card";
import { ProfileCardSkeleton } from "@/features/profiles/profile-card/components/profile-card-skeleton";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useMyProfilesList } from "../hooks/use-my-profiles-list";
import { MyProfileActions } from "./my-profile-actions";

export function MyProfilesList() {
  const { myProfilesData, isMyProfilesLoading } = useMyProfilesList();

  const body = useMemo(() => {
    if (isMyProfilesLoading) {
      return (
        <ItemsList
          noParent
          count={3}
          item={<ProfileCardSkeleton />}
          className="w-full"
        />
      );
    }

    if (myProfilesData) {
      return myProfilesData.data.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          name={profile.name}
          description={profile.description}
          typeName={profile.type.name}
          tones={profile.tones.map((tone) => tone.name)}
          platforms={profile.platforms.map((platform) => platform.name)}
          actions={<MyProfileActions id={profile.id} name={profile.name} />}
        />
      ));
    }

    return null;
  }, [isMyProfilesLoading, myProfilesData]);

  return (
    <ContentLayout className="grid grid-cols-2 gap-4">{body}</ContentLayout>
  );
}
