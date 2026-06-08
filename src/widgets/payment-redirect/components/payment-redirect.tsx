import { CircleCheckIcon, ClockIcon, LoaderIcon } from "lucide-react";
import { useMemo } from "react";

import type { PaymentRedirectSearch } from "@/routes/_with-auth/_without-subscription/payment-redirect";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { CRLF } from "@/shared/constants/unicode";

import { usePaymentRedirect } from "../hooks/use-payment-redirect";

type PaymentRedirectProps = PaymentRedirectSearch;

type PlugWithActionProps = {
  onAction: () => void;
};

export function PaymentRedirect({
  redirect,
  tariffSlug,
  trialTariffSlug,
  creditsPackageSlug,
  paymentId,
}: PaymentRedirectProps) {
  const {
    paymentRedirectStatus,
    handleRedirectToPayment,
    handleInitiatePayment,
  } = usePaymentRedirect({
    redirect,
    tariffSlug,
    trialTariffSlug,
    creditsPackageSlug,
    paymentId,
  });

  const body = useMemo(() => {
    switch (paymentRedirectStatus) {
      case "initiate-payment-pending":
        return <InitiatePaymentPendingPlug />;
      case "initiate-payment-error":
        return <InitiatePaymentErrorPlug onAction={handleInitiatePayment} />;
      case "initiate-payment-success":
        return <InitiatePaymentSuccessPlug />;
      case "payment-loading":
        return <PaymentLoadingPlug />;
      case "payment-pending":
        return <PaymentPendingPlug onAction={handleRedirectToPayment} />;
      case "payment-error":
        return <PaymentErrorPlug onAction={handleInitiatePayment} />;
      case "payment-success":
        return <PaymentSuccessPlug />;
      default:
        return null;
    }
  }, [paymentRedirectStatus, handleInitiatePayment, handleRedirectToPayment]);

  return (
    <Island grow className="justify-center">
      {body}
    </Island>
  );
}

function InitiatePaymentPendingPlug() {
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

function InitiatePaymentErrorPlug({ onAction }: PlugWithActionProps) {
  return (
    <Plug
      size="lg"
      variant="negative"
      title="Ошибка"
      description={`Не удалось инициировать оплату.${CRLF}Попробуйте ещё раз или повторите попытку позднее`}
      actions={
        <Button size="lg" className="mt-2" onClick={onAction}>
          Попробовать снова
        </Button>
      }
    />
  );
}

function InitiatePaymentSuccessPlug() {
  return (
    <Plug
      size="lg"
      variant="positive"
      icon={CircleCheckIcon}
      title="Перенаправляем на страницу оплаты"
      description="Пожалуйста, подождите несколько секунд"
    />
  );
}

function PaymentLoadingPlug() {
  return (
    <Plug
      size="lg"
      icon={LoaderIcon}
      title="Загружаем платеж"
      description="Получаем информацию о вашем платеже"
      iconClassName="animate-spin"
    />
  );
}

function PaymentPendingPlug({ onAction }: PlugWithActionProps) {
  return (
    <Plug
      size="lg"
      icon={ClockIcon}
      title="Ожидаем проведения платежа"
      description="Ждем ответа от платежного провайдера и проводим активацию подписки"
      actions={
        <Button size="lg" className="mt-2" onClick={onAction}>
          Перейти к оплате
        </Button>
      }
    />
  );
}

function PaymentErrorPlug({ onAction }: PlugWithActionProps) {
  return (
    <Plug
      size="lg"
      variant="negative"
      title="Ошибка платежа"
      description="Не удалось провести платеж. Попробуйте ещё раз или повторите попытку позднее"
      actions={
        <Button size="lg" className="mt-2" onClick={onAction}>
          Попробовать ещё раз
        </Button>
      }
    />
  );
}

function PaymentSuccessPlug() {
  return (
    <Plug
      size="lg"
      icon={CircleCheckIcon}
      title="Все получилось!"
      description="Перенаправляем вас в личный кабинет"
    />
  );
}
