import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingPossibilitiesHeader } from "@/features/landing/landing-possibilities/components/landing-possibilities-header";
import { LandingPossibilitiesList } from "@/features/landing/landing-possibilities/components/landing-possibilities-list";

export function LandingPossibilities() {
  return (
    <LandingIsland
      id="possibilities"
      className="from-neutral-8 dark:from-neutral-1 to-accent-6 isolate items-center gap-6 bg-linear-to-r sm:gap-8"
    >
      <LandingPossibilitiesHeader />
      <LandingPossibilitiesList />
    </LandingIsland>
  );
}
