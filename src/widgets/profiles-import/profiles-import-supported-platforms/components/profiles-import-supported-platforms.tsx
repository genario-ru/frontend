import { Link2Icon } from "lucide-react";
import { useMemo } from "react";

import {
  ProfilesImportSupportedPlatformsItem,
  ProfilesImportSupportedPlatformsItemSkeleton,
} from "@/features/profiles-import/profiles-import-supported-platforms/components/profiles-import-supported-platforms-item";
import { ItemsList } from "@/shared/components/common/items-list";
import { Heading } from "@/shared/components/ui/heading";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import { useProfilesImportSupportedPlatforms } from "../hooks/use-profiles-import-supported-platforms";

const SUPPORTED_PLATFORMS_MAX_ITEMS = 3;

export function ProfilesImportSupportedPlatforms() {
  const {
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
    isProfileChannelPlatformsError,
  } = useProfilesImportSupportedPlatforms();

  const logos = useMemo(() => {
    if (isProfileChannelPlatformsError) {
      return null;
    }

    if (isProfileChannelPlatformsLoading) {
      return (
        <ItemsList
          noParent
          count={SUPPORTED_PLATFORMS_MAX_ITEMS}
          item={<ProfilesImportSupportedPlatformsItemSkeleton />}
        />
      );
    }

    const platforms = profileChannelPlatformsData?.data ?? [];

    if (!platforms.length) {
      return null;
    }

    return platforms
      .slice(0, SUPPORTED_PLATFORMS_MAX_ITEMS)
      .map((platform) => (
        <ProfilesImportSupportedPlatformsItem
          key={platform.id}
          name={platform.name}
          logoUrl={platform.logoUrl}
        />
      ));
  }, [
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
    isProfileChannelPlatformsError,
  ]);

  return (
    <section className="bg-neutral-2 rounded-4 flex w-full flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
      <header className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <LucideIcon icon={Link2Icon} />
          <Heading variant="h3">Какие платформы поддерживаются</Heading>
        </div>
        <p className="text-neutral-7">
          Для автоматического импорта поддерживаются TikTok, YouTube и Instagram
        </p>
      </header>
      {logos ? (
        <div
          className="flex shrink-0 items-center gap-2"
          aria-label="Поддерживаемые платформы"
        >
          {logos}
        </div>
      ) : null}
    </section>
  );
}
