import { LandingFaqAccordionItems } from "@/features/landing/landing-faq/components/landing-faq-accordion";
import { LandingFaqHeader } from "@/features/landing/landing-faq/components/landing-faq-header";
import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";

export function LandingFaq() {
  return (
    <LandingIsland row className="gap-24">
      <LandingFaqHeader />
      <LandingFaqAccordionItems />
    </LandingIsland>
  );
}
