import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingTemplatesHeader } from "@/features/landing/landing-templates/components/landing-templates-header";

import { LandingTemplatesCarousel } from "./landing-templates-carousel";

export function LandingTemplates() {
  return (
    <LandingIsland className="items-center gap-8 overflow-hidden">
      <LandingTemplatesHeader />
      <LandingTemplatesCarousel />
    </LandingIsland>
  );
}
