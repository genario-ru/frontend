import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingPossibilitiesHeader } from "@/features/landing/landing-possibilities/components/landing-possibilities-header";
import { LandingPossibilitiesList } from "@/features/landing/landing-possibilities/components/landing-possibilities-list";

export function LandingPossibilities() {
  return (
    <LandingIsland className="from-neutral-8 to-accent-6 items-center gap-8 bg-linear-to-r">
      <LandingPossibilitiesHeader />
      <LandingPossibilitiesList />
    </LandingIsland>
  );
}
