import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingPersonalizationFeatures } from "@/features/landing/landing-personalization/components/landing-personalization-features";

export function LandingPersonalization() {
  return (
    <LandingIsland id="personalization">
      <LandingPersonalizationFeatures />
    </LandingIsland>
  );
}
