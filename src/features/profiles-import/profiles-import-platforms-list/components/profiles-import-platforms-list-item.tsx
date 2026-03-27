import { VideoIcon } from "lucide-react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

type ProfilesImportPlatformsListItemProps = {
  name: string;
  description?: string | null;
  logoUrl?: string | null;
};

export function ProfilesImportPlatformsListItem({
  logoUrl,
  name,
  description,
}: ProfilesImportPlatformsListItemProps) {
  return (
    <div className="flex w-full gap-3">
      <div className="bg-neutral-1 rounded-4 flex h-14 w-14 items-center justify-center">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="h-10 w-10 object-contain" />
        ) : (
          <LucideIcon icon={VideoIcon} className="size-10" />
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-medium">{name}</p>
        {description && (
          <p className="text-neutral-7 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}

export function ProfilesImportPlatformsListItemSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="rounded-4 h-14 w-14" />
      <div className="flex flex-1 flex-col gap-1">
        <TextSkeleton fontSize={16} lineHeight={24} className="w-40" />
        <TextSkeleton fontSize={16} lineHeight={20} linesCount={2} />
      </div>
    </div>
  );
}
