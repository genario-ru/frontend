import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingTemplatesHeader } from "@/features/landing/landing-templates/components/landing-templates-header";

import { LandingTemplatesCarousel } from "./landing-templates-carousel";

export function LandingTemplates() {
  return (
    <LandingIsland
      id="templates"
      className="isolate items-center gap-6 overflow-hidden sm:gap-8"
    >
      <LandingTemplatesHeader />
      <LandingTemplatesCarousel />
    </LandingIsland>
  );
}
