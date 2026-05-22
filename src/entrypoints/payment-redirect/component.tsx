import { useSearch } from "@tanstack/react-router";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { PaymentRedirect } from "@/widgets/payment-redirect/components/payment-redirect";
import { PaymentRedirectFooter } from "@/widgets/payment-redirect/components/payment-redirect-footer";
import { PaymentRedirectHeader } from "@/widgets/payment-redirect/components/payment-redirect-header";

export function PaymentRedirectComponent() {
  const { redirect, tariffSlug, trialTariffSlug, creditsPackageSlug } =
    useSearch({ from: "/_with-auth/_without-subscription/payment-redirect" });

  return (
    <PageLayout className="h-fit min-h-full">
      <PaymentRedirectHeader />
      <ContentLayout className="flex-1">
        <PaymentRedirect
          redirect={redirect}
          tariffSlug={tariffSlug}
          trialTariffSlug={trialTariffSlug}
          creditsPackageSlug={creditsPackageSlug}
        />
      </ContentLayout>
      <PaymentRedirectFooter />
    </PageLayout>
  );
}
