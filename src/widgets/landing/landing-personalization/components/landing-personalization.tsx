import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingPersonalizationFeatures } from "@/features/landing/landing-personalization/components/landing-personalization-features";
import { LandingPersonalizationHeader } from "@/features/landing/landing-personalization/components/landing-personalization-header";

export function LandingPersonalization() {
  return (
    <LandingIsland
      id="personalization"
      className="items-center gap-8 sm:gap-12"
    >
      <LandingPersonalizationHeader />
      <LandingPersonalizationFeatures />
    </LandingIsland>
  );
}
