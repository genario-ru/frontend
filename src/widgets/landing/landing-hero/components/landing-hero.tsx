import { LandingHeroActions } from "@/features/landing/landing-hero/components/landing-hero-actions";
import { LandingHeroBadge } from "@/features/landing/landing-hero/components/landing-hero-badge";
import { LandingHeroTitle } from "@/features/landing/landing-hero/components/landing-hero-title";
import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";

export function LandingHero() {
  return (
    <LandingIsland className="items-center gap-8">
      <LandingHeroBadge />
      <LandingHeroTitle />
      <LandingHeroActions />
    </LandingIsland>
  );
}
