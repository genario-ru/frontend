import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { LandingFaq } from "@/widgets/landing/landing-faq/components/landing-faq";
import { LandingFooter } from "@/widgets/landing/landing-footer/components/landing-footer";
import { LandingHeader } from "@/widgets/landing/landing-header/components/landing-header";
import { LandingHero } from "@/widgets/landing/landing-hero/components/landing-hero";
import { LandingPersonalization } from "@/widgets/landing/landing-personalization/components/landing-personalization";
import { LandingPossibilities } from "@/widgets/landing/landing-possibilities/components/landing-possibilities";
import { LandingTariffs } from "@/widgets/landing/landing-tariffs/components/landing-tariffs";
import { LandingTemplates } from "@/widgets/landing/landing-templates/components/landing-templates";
import { LandingTrialTariff } from "@/widgets/landing/landing-trial-tariff/components/landing-trial-tariff";
import { AppWithoutAuthHeaderActions } from "@/widgets/navigation/app-without-auth-header/components/app-without-auth-header-actions";

export function LandingComponent() {
  return (
    <PageLayout>
      <ContentLayout>
        <LandingHeader right={<AppWithoutAuthHeaderActions />} />
        <LandingHero />
        <LandingPossibilities />
        <LandingTemplates />
        <LandingPersonalization />
        <LandingTrialTariff />
        <LandingTariffs />
        <LandingFaq />
        <LandingFooter />
      </ContentLayout>
    </PageLayout>
  );
}
