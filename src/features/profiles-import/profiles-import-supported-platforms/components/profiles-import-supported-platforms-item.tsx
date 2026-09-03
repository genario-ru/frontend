import { VideoIcon } from "lucide-react";
import { useMemo } from "react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

type ProfilesImportSupportedPlatformsItemProps = {
  name: string;
  logoUrl?: string | null;
  className?: string;
};

type ProfilesImportSupportedPlatformsItemSkeletonProps = {
  className?: string;
};

export function ProfilesImportSupportedPlatformsItem({
  name,
  logoUrl,
  className,
}: ProfilesImportSupportedPlatformsItemProps) {
  const media = useMemo(() => {
    if (logoUrl) {
      return (
        <img src={logoUrl} alt={name} className="size-[52px] object-contain" />
      );
    }

    return <LucideIcon icon={VideoIcon} className="size-10" />;
  }, [logoUrl, name]);

  return (
    <div
      className={cn(
        "bg-neutral-1 rounded-3 flex size-16 items-center justify-center p-1",
        className,
      )}
    >
      {media}
    </div>
  );
}

export function ProfilesImportSupportedPlatformsItemSkeleton({
  className,
}: ProfilesImportSupportedPlatformsItemSkeletonProps) {
  return <Skeleton className={cn("rounded-3 size-16", className)} />;
}
