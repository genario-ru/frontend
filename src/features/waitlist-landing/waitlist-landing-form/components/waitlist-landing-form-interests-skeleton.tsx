import { Skeleton } from "@/shared/components/ui/skeleton";

const WAITLIST_LANDING_FORM_INTERESTS_SKELETON_WIDTHS = [
  "w-40",
  "w-52",
  "w-44",
  "w-36",
  "w-48",
  "w-40",
];

export function WaitlistLandingFormInterestsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="rounded-2 h-5 w-56" />
      <div className="flex flex-wrap gap-2">
        {WAITLIST_LANDING_FORM_INTERESTS_SKELETON_WIDTHS.map((width, index) => (
          <Skeleton
            key={`waitlist-landing-form-interest-skeleton-${index}`}
            className={`rounded-4 h-10 ${width}`}
          />
        ))}
      </div>
    </div>
  );
}
