import { VideoIcon } from "lucide-react";

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
  return (
    <div
      className={cn(
        "bg-neutral-2 rounded-3 flex size-16 items-center justify-center p-1 shadow-sm",
        className,
      )}
    >
      {logoUrl ? (
        <img src={logoUrl} alt={name} className="size-[52px] object-contain" />
      ) : (
        <LucideIcon icon={VideoIcon} className="size-10" />
      )}
    </div>
  );
}

export function ProfilesImportPlatformsFanItemSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={cn("rounded-3 size-16", className)} />;
}
