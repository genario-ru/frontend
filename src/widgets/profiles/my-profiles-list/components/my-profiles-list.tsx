import { ProfileCard } from "@/features/profiles/profile-card/components/profile-card";
import { ProfileCardSkeleton } from "@/features/profiles/profile-card/components/profile-card-skeleton";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useMyProfilesList } from "../hooks/use-my-profiles-list";
import { MyProfileActions } from "./my-profile-actions";

export function MyProfilesList() {
  const { profilesData, isLoadingProfiles } = useMyProfilesList();

  if (isLoadingProfiles) {
    <ItemsList count={3} gap={16} item={<ProfileCardSkeleton />} />;
  }

  if (profilesData) {
    return (
      <ContentLayout className="gap-6" size="md">
        {profilesData.data.map((profile) => (
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
        ))}
      </ContentLayout>
    );
  }

  return null;
}
