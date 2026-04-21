import { PlusIcon } from "lucide-react";

import { ProfileCard } from "@/features/profiles/profile-card/components/profile-card";
import { ProfileCardSkeleton } from "@/features/profiles/profile-card/components/profile-card-skeleton";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";

import { useMyProfilesList } from "../hooks/use-my-profiles-list";
import { MyProfileActions } from "./my-profile-actions";

export function MyProfilesList() {
  const { myProfilesData, isMyProfilesLoading } = useMyProfilesList();

  if (isMyProfilesLoading) {
    return <MyProfilesListSkeleton />;
  }

  if (!myProfilesData) {
    return null;
  }

  if (!myProfilesData.data.length) {
    return <MyProfilesListEmpty />;
  }

  return (
    <ContentLayout className="grid grid-cols-1 lg:grid-cols-2">
      {myProfilesData.data.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          name={profile.name}
          description={profile.description}
          typeName={profile.type?.name}
          tones={profile.tones.map((tone) => tone.name)}
          platforms={profile.platforms.map((platform) => platform.name)}
          actions={
            <MyProfileActions
              profileId={profile.id}
              profileName={profile.name}
            />
          }
        />
      ))}
    </ContentLayout>
  );
}

function MyProfilesListSkeleton() {
  return (
    <ItemsList
      gap={16}
      count={4}
      item={<ProfileCardSkeleton />}
      className="grid w-full grid-cols-2"
    />
  );
}

function MyProfilesListEmpty() {
  return (
    <Island className="flex-1 items-center justify-center">
      <Plug
        size="lg"
        title="Нет профилей каналов"
        description="Создайте первый профиль канала для лучшей персонализации генерируемого контента"
        actions={
          <ButtonLink
            size="lg"
            variant="accent"
            priority="primary"
            to="/profiles/settings"
            icon={<PlusIcon />}
            className="mt-3"
          >
            Создать профиль
          </ButtonLink>
        }
      />
    </Island>
  );
}
