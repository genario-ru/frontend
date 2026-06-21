import { WaitlistLandingHeroActions } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-actions";
import { WaitlistLandingHeroBadge } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-badge";
import { WaitlistLandingHeroSubtitle } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-subtitle";
import { WaitlistLandingHeroTitle } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-title";
import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";

export function WaitlistLandingHero() {
  return (
    <WaitlistLandingIsland className="items-center gap-6">
      <WaitlistLandingHeroBadge />
      <WaitlistLandingHeroTitle />
      <WaitlistLandingHeroSubtitle />
      <WaitlistLandingHeroActions />
    </WaitlistLandingIsland>
  );
}
