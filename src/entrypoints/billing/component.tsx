import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";
import { BillingAppMenubar } from "@/widgets/billing/billing-app-menubar/components/billing-app-menubar";
import { BillingMyPaymentMethods } from "@/widgets/billing/billing-my-payment-methods/components/billing-my-payment-methods";
import { BillingMyRecentOperations } from "@/widgets/billing/billing-my-recent-operations/components/billing-my-recent-operations";
import { BillingMySubscriptions } from "@/widgets/billing/billing-my-subscriptions/components/billing-my-subscriptions";

export function BillingComponent() {
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
          <BillingMySubscriptions />
          <BillingMyPaymentMethods />
        </div>
        <BillingMyRecentOperations />
      </ContentLayout>
    </PageLayout>
  );
}
