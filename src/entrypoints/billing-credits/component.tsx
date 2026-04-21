import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { CreditsMyBalance } from "@/widgets/credits/credits-my-balance/components/credits-my-balance";
import { CreditsPackages } from "@/widgets/credits/credits-packages-list/components/credits-packages";
import { CreditsUsage } from "@/widgets/credits/credits-usage-list/components/credits-usage";

export function BillingCreditsComponent() {
  return (
    <ContentLayout className="grid flex-1 grid-cols-2">
      <div className="flex flex-1 flex-col gap-2">
        <CreditsMyBalance />
        <CreditsPackages />
      </div>
      <CreditsUsage />
    </ContentLayout>
  );
}
