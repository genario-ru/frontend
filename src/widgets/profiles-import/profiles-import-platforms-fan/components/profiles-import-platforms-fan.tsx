import { useMemo } from "react";

import {
  ProfilesImportPlatformsFanItem,
  ProfilesImportPlatformsFanItemSkeleton,
} from "@/features/profiles-import/profiles-import-platforms-fan/components/profiles-import-platforms-fan-item";
import { cn } from "@/shared/utils/cn";

import { useProfilesImportPlatformsFan } from "../hooks/use-profiles-import-platforms-fan";

const PLATFORM_FAN_ROTATIONS = [
  "-rotate-[10deg]",
  "rotate-0",
  "rotate-[10deg]",
] as const;

export function ProfilesImportPlatformsFan() {
  const { profileChannelPlatformsData, isProfileChannelPlatformsLoading } =
    useProfilesImportPlatformsFan();

  const body = useMemo(() => {
    if (isProfileChannelPlatformsLoading) {
      return (
        <>
          {PLATFORM_FAN_ROTATIONS.map((rotation, index) => (
            <ProfilesImportPlatformsFanItemSkeleton
              key={`profiles-import-platforms-fan-skeleton-${index}`}
              className={cn("absolute -top-3", rotation, {
                "left-0": index === 0,
                "left-8": index === 1,
                "left-[54px]": index === 2,
              })}
            />
          ))}
        </>
      );
    }

    const platforms = profileChannelPlatformsData?.data ?? [];

    if (!platforms.length) {
      return null;
    }

    return platforms.slice(0, 3).map((platform, index) => (
      <ProfilesImportPlatformsFanItem
        key={platform.id}
        name={platform.name}
        logoUrl={platform.logoUrl}
        className={cn(
          "absolute -top-3",
          PLATFORM_FAN_ROTATIONS[index] ?? "rotate-0",
          {
            "left-0 z-1": index === 0,
            "left-8 z-2": index === 1,
            "left-[54px] z-3": index === 2,
          },
        )}
      />
    ));
  }, [profileChannelPlatformsData, isProfileChannelPlatformsLoading]);

  if (!body) {
    return null;
  }

  return (
    <div
      className="relative -mt-3 h-10 w-32 shrink-0"
      aria-label="Поддерживаемые платформы"
    >
      {body}
    </div>
  );
}
