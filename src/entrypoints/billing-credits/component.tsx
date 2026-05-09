import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";
import { BillingAppMenubar } from "@/widgets/billing/billing-app-menubar/components/billing-app-menubar";
import { CreditsMyBalance } from "@/widgets/credits/credits-my-balance/components/credits-my-balance";
import { CreditsPackages } from "@/widgets/credits/credits-packages-list/components/credits-packages";
import { CreditsUsage } from "@/widgets/credits/credits-usage-list/components/credits-usage";

export function BillingCreditsComponent() {
  const { isMobile } = useBreakpoints();

  return (
    <PageLayout
      className={cn("pb-8", {
        "h-full": !isMobile,
        "h-fit min-h-full": isMobile,
      })}
    >
      <BillingAppMenubar />
      <ContentLayout
        className={cn("grid flex-1 gap-2", {
          "grid-cols-2 overflow-hidden": !isMobile,
        })}
      >
        <div
          className={cn("flex flex-col gap-2", {
            "h-full overflow-hidden": !isMobile,
          })}
        >
          <CreditsMyBalance />
          <CreditsPackages />
        </div>
        <CreditsUsage />
      </ContentLayout>
    </PageLayout>
  );
}
