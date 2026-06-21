import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";
import { WaitlistLandingPossibilitiesHeader } from "@/features/waitlist-landing/waitlist-landing-possibilities/components/waitlist-landing-possibilities-header";
import { WaitlistLandingPossibilitiesList } from "@/features/waitlist-landing/waitlist-landing-possibilities/components/waitlist-landing-possibilities-list";

export function WaitlistLandingPossibilities() {
  return (
    <WaitlistLandingIsland
      id="possibilities"
      className="from-neutral-8 dark:from-neutral-1 to-accent-6 isolate items-center gap-6 bg-linear-to-r sm:gap-8"
    >
      <WaitlistLandingPossibilitiesHeader />
      <WaitlistLandingPossibilitiesList />
    </WaitlistLandingIsland>
  );
}
