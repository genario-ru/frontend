import { VideoIcon } from "lucide-react";
import { useMemo } from "react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

type ProfilesImportPlatformsFanItemProps = {
  name: string;
  logoUrl?: string | null;
  className?: string;
};

export function ProfilesImportPlatformsFanItem({
  name,
  logoUrl,
  className,
}: ProfilesImportPlatformsFanItemProps) {
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
        "bg-neutral-2 rounded-3 flex size-16 items-center justify-center p-1 shadow-sm",
        className,
      )}
    >
      {media}
    </div>
  );
}

type ProfilesImportPlatformsFanItemSkeletonProps = {
  className?: string;
};

export function ProfilesImportPlatformsFanItemSkeleton({
  className,
}: ProfilesImportPlatformsFanItemSkeletonProps) {
  return <Skeleton className={cn("rounded-3 size-16", className)} />;
}
