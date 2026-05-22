import { CircleCheckIcon, LoaderIcon } from "lucide-react";
import { useMemo } from "react";

import type { PaymentRedirectSearch } from "@/routes/_with-auth/_without-subscription/payment-redirect";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { CRLF } from "@/shared/constants/unicode";

import { usePaymentRedirect } from "../hooks/use-payment-redirect";

type PaymentRedirectProps = PaymentRedirectSearch;

export function PaymentRedirect({
  redirect,
  tariffSlug,
  trialTariffSlug,
  creditsPackageSlug,
}: PaymentRedirectProps) {
  const {
    handleInitiatePayment,
    isInitiatePaymentPending,
    isInitiatePaymentError,
    isInitiatePaymentSuccess,
  } = usePaymentRedirect({
    redirect,
    tariffSlug,
    trialTariffSlug,
    creditsPackageSlug,
  });

  const body = useMemo(() => {
    if (isInitiatePaymentPending) {
      return (
        <Plug
          size="lg"
          icon={LoaderIcon}
          title="Готовим ссылку для оплаты"
          description="Вы будете перенаправлены на страницу оплаты через несколько секунд"
          iconClassName="animate-spin"
        />
      );
    }

    if (isInitiatePaymentError) {
      return (
        <Plug
          size="lg"
          variant="negative"
          title="Ошибка"
          description={`Не удалось инициировать оплату.${CRLF}Попробуйте ещё раз или повторите попытку позднее`}
          actions={
            <Button size="lg" className="mt-2" onClick={handleInitiatePayment}>
              Попробовать снова
            </Button>
          }
        />
      );
    }

    if (isInitiatePaymentSuccess) {
      return (
        <Plug
          size="lg"
          icon={CircleCheckIcon}
          title="Перенаправляем на страницу оплаты"
          description="Пожалуйста, подождите несколько секунд"
        />
      );
    }

    return (
      <Plug
        size="lg"
        icon={CircleCheckIcon}
        title="Ожидаем инициализацию оплаты"
        description="Пожалуйста, подождите несколько секунд"
      />
    );
  }, [
    isInitiatePaymentPending,
    isInitiatePaymentError,
    isInitiatePaymentSuccess,
    handleInitiatePayment,
  ]);

  return (
    <Island grow className="justify-center">
      {body}
    </Island>
  );
}
