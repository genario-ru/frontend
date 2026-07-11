import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

export function ProfileSettingsReferenceCardSkeleton() {
  return (
    <div className="bg-neutral-2 rounded-4 flex min-w-0 flex-col gap-3 overflow-hidden p-2">
      <Skeleton className="rounded-3 aspect-video w-full" />
      <div className="flex min-w-0 items-center gap-1.5 px-1 pb-1">
        <Skeleton className="size-4 shrink-0 rounded-full" />
        <TextSkeleton fontSize={14} lineHeight={20} className="w-3/4" />
      </div>
    </div>
  );
}
