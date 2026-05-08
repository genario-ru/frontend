import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Island } from "@/shared/components/ui/island";
import { PaymentRedirectFooter } from "@/widgets/payment-redirect/components/payment-redirect-footer";
import { PaymentRedirectHeader } from "@/widgets/payment-redirect/components/payment-redirect-header";

export function PaymentRedirectPendingComponent() {
  return (
    <PageLayout>
      <ContentLayout>
        <PaymentRedirectHeader />
        <Island className="flex-1">Something</Island>
        <PaymentRedirectFooter />
      </ContentLayout>
    </PageLayout>
  );
}
