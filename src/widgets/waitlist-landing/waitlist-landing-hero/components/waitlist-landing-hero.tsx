import { WaitlistLandingHeroActions } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-actions";
import { WaitlistLandingHeroBadge } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-badge";
import { WaitlistLandingHeroPreview } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-preview";
import { WaitlistLandingHeroSubtitle } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-subtitle";
import { WaitlistLandingHeroTitle } from "@/features/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero-title";
import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";

export function WaitlistLandingHero() {
  return (
    <WaitlistLandingIsland className="from-neutral-8 via-neutral-8 to-accent-7 dark:from-neutral-1 dark:via-neutral-1 relative isolate overflow-hidden bg-linear-to-br">
      <div className="from-accent-4/25 absolute inset-y-0 right-0 w-2/3 bg-linear-to-l to-transparent" />
      <div className="from-neutral-1/10 absolute inset-x-0 bottom-0 h-32 bg-linear-to-t to-transparent" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.78fr)] lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <WaitlistLandingHeroBadge />
          <WaitlistLandingHeroTitle />
          <WaitlistLandingHeroSubtitle />
          <WaitlistLandingHeroActions />
        </div>
        <WaitlistLandingHeroPreview />
      </div>
    </WaitlistLandingIsland>
  );
}
