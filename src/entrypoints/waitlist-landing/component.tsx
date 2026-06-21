import { WaitlistLandingHeaderActions } from "@/features/waitlist-landing/waitlist-landing-header/components/waitlist-landing-header-actions";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { WaitlistLandingFooter } from "@/widgets/waitlist-landing/waitlist-landing-footer/components/waitlist-landing-footer";
import { WaitlistLandingForm } from "@/widgets/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form";
import { WaitlistLandingHeader } from "@/widgets/waitlist-landing/waitlist-landing-header/components/waitlist-landing-header";
import { WaitlistLandingHero } from "@/widgets/waitlist-landing/waitlist-landing-hero/components/waitlist-landing-hero";
import { WaitlistLandingPossibilities } from "@/widgets/waitlist-landing/waitlist-landing-possibilities/components/waitlist-landing-possibilities";
import { WaitlistLandingProblem } from "@/widgets/waitlist-landing/waitlist-landing-problem/components/waitlist-landing-problem";

export function WaitlistLandingComponent() {
  return (
    <PageLayout>
      <ContentLayout>
        <WaitlistLandingHeader right={<WaitlistLandingHeaderActions />} />
        <WaitlistLandingHero />
        <WaitlistLandingProblem />
        <WaitlistLandingPossibilities />
        <WaitlistLandingForm />
        <WaitlistLandingFooter />
      </ContentLayout>
    </PageLayout>
  );
}
