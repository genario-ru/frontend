import { Skeleton } from "@/shared/components/ui/skeleton";

const WAITLIST_LANDING_POSSIBILITIES_SKELETON_COUNT = 6;

export function WaitlistLandingPossibilitiesSkeleton() {
  return (
    <div className="grid w-full gap-3 md:grid-cols-2">
      {Array.from({
        length: WAITLIST_LANDING_POSSIBILITIES_SKELETON_COUNT,
      }).map((_, index) => (
        <div
          key={`waitlist-landing-possibilities-skeleton-${index}`}
          className="rounded-4 bg-neutral-1/30 dark:bg-neutral-8/30 flex h-full flex-col gap-3 p-5 sm:p-6"
        >
          <div className="flex items-center gap-1.5">
            <Skeleton className="rounded-2 bg-neutral-1/40 dark:bg-neutral-8/40 size-6" />
            <Skeleton className="rounded-2 bg-neutral-1/40 dark:bg-neutral-8/40 h-6 w-40" />
          </div>
          <Skeleton className="rounded-2 bg-neutral-1/30 dark:bg-neutral-8/30 h-4 w-full" />
          <Skeleton className="rounded-2 bg-neutral-1/30 dark:bg-neutral-8/30 h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}
