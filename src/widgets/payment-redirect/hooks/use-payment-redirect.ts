import { useMount } from "@siberiacancode/reactuse";
import { useCallback, useMemo } from "react";

import { useInitiateSubscriptionPayment } from "@/actions/billing/hooks/use-initiate-subscription-payment";
import { useInitiateCreditsPackagePayment } from "@/actions/credits/hooks/use-initiate-credits-package-payment";
import type { PaymentRedirectSearch } from "@/routes/_with-auth/_without-subscription/payment-redirect";
import { useToast } from "@/shared/hooks/use-toast";

type UsePaymentRedirectParams = PaymentRedirectSearch;

export function usePaymentRedirect({
  redirect,
  tariffSlug,
  trialTariffSlug,
  creditsPackageSlug,
}: UsePaymentRedirectParams) {
  const { showErrorToast } = useToast();

  const {
    isInitiateSubscriptionPaymentPending,
    isInitiateSubscriptionPaymentError,
    isInitiateSubscriptionPaymentSuccess,
    initiateSubscriptionPayment,
  } = useInitiateSubscriptionPayment();

  const {
    isInitiateCreditsPackagePaymentPending,
    isInitiateCreditsPackagePaymentError,
    isInitiateCreditsPackagePaymentSuccess,
    initiateCreditsPackagePayment,
  } = useInitiateCreditsPackagePayment();

  const isInitiatePaymentPending =
    isInitiateSubscriptionPaymentPending ||
    isInitiateCreditsPackagePaymentPending;

  const isInitiatePaymentError =
    isInitiateSubscriptionPaymentError || isInitiateCreditsPackagePaymentError;

  const isInitiatePaymentSuccess =
    isInitiateSubscriptionPaymentSuccess ||
    isInitiateCreditsPackagePaymentSuccess;

  const redirectUrl = useMemo(() => {
    if (redirect) {
      return `${window.location.origin}${redirect}`;
    }
  }, [redirect]);

  const handleInitiatePayment = useCallback(() => {
    if (tariffSlug) {
      initiateSubscriptionPayment(
        {
          data: {
            tariffSlug,
            trialTariffSlug,
            redirect: redirectUrl,
          },
        },
        {
          onSuccess: ({ data: { paymentLink } }) => {
            window.location.href = paymentLink;
          },
        },
      );
    } else if (creditsPackageSlug) {
      initiateCreditsPackagePayment(
        {
          data: {
            creditsPackageSlug,
          },
        },
        {
          onSuccess: ({ data: { paymentLink } }) => {
            window.location.href = paymentLink;
          },
        },
      );
    } else {
      showErrorToast({
        description:
          "Не удалось инициировать оплату. Попробуйте ещё раз или повторите попытку позднее",
      });
    }
  }, [
    creditsPackageSlug,
    tariffSlug,
    trialTariffSlug,
    redirectUrl,
    showErrorToast,
    initiateCreditsPackagePayment,
    initiateSubscriptionPayment,
  ]);

  useMount(handleInitiatePayment);

  return {
    handleInitiatePayment,
    isInitiatePaymentPending,
    isInitiatePaymentError,
    isInitiatePaymentSuccess,
  };
}
