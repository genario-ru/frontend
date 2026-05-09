import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { BillingAppMenubar } from "@/widgets/billing/billing-app-menubar/components/billing-app-menubar";
import { CreditsMyBalance } from "@/widgets/credits/credits-my-balance/components/credits-my-balance";
import { CreditsPackages } from "@/widgets/credits/credits-packages-list/components/credits-packages";
import { CreditsUsage } from "@/widgets/credits/credits-usage-list/components/credits-usage";

export function BillingCreditsComponent() {
  return (
    <PageLayout className="h-full pb-8">
      <BillingAppMenubar />
      <ContentLayout className="grid flex-1 grid-cols-2 gap-2 overflow-hidden">
        <div className="flex h-full flex-col gap-2 overflow-hidden">
          <CreditsMyBalance />
          <CreditsPackages />
        </div>
        <CreditsUsage />
      </ContentLayout>
    </PageLayout>
  );
}
