import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { LandingHero } from "@/widgets/landing/landing-hero/components/landing-hero";
import { LandingMenubar } from "@/widgets/landing/landing-menubar/components/landing-menubar";
import { LandingPersonalization } from "@/widgets/landing/landing-personalization/components/landing-personalization";
import { LandingPossibilities } from "@/widgets/landing/landing-possibilities/components/landing-possibilities";
import { LadndingTariffs } from "@/widgets/landing/landing-tariffs/components/landing-tariffs";
import { LandingTemplates } from "@/widgets/landing/landing-templates/components/landing-templates";

export function LandingComponent() {
  return (
    <PageLayout className="max-w-7xl py-0">
      <ContentLayout className="gap-6">
        <LandingMenubar />
        <LandingHero />
        <LandingPossibilities />
        <LandingTemplates />
        <LandingPersonalization />
        <LadndingTariffs />
      </ContentLayout>
    </PageLayout>
  );
}
