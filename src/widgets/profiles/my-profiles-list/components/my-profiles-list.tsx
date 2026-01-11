import { ProfileCard } from "@/features/profiles/profile-card/components/profile-card";
import { ProfileCardSkeleton } from "@/features/profiles/profile-card/components/profile-card-skeleton";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useMyProfilesList } from "../hooks/use-my-profiles-list";
import { MyProfileActions } from "./my-profile-actions";

export function MyProfilesList() {
  const { myProfilesData, isMyProfilesLoading } = useMyProfilesList();

  return (
    <ContentLayout className="gap-4" size="md">
      {isMyProfilesLoading ? (
        <ItemsList
          count={3}
          gap={24}
          item={<ProfileCardSkeleton />}
          className="w-full"
        />
      ) : myProfilesData ? (
        myProfilesData.data.map((profile) => (
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
        ))
      ) : null}
    </ContentLayout>
  );
}
