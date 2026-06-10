import {
  ArrowUpRightIcon,
  CircleCheckIcon,
  ClockIcon,
  LoaderIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useMemo } from "react";

import type { PaymentRedirectSearch } from "@/routes/_with-auth/_without-subscription/payment-redirect";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";

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
  paymentMethodId,
  paymentId,
}: PaymentRedirectProps) {
  const {
    paymentRedirectStatus,
    hasPaymentLink,
    handleRedirectToPayment,
    handleInitiatePayment,
  } = usePaymentRedirect({
    redirect,
    tariffSlug,
    trialTariffSlug,
    creditsPackageSlug,
    paymentMethodId,
    paymentId,
  });

  const body = useMemo(() => {
    switch (paymentRedirectStatus) {
      case "initiate-payment-pending":
        return <InitiatePaymentPendingPlug />;
      case "initiate-payment-error":
        return <InitiatePaymentErrorPlug onAction={handleInitiatePayment} />;
      case "payment-loading":
        return <PaymentLoadingPlug />;
      case "payment-pending":
        return (
          <PaymentPendingPlug
            onAction={hasPaymentLink ? handleRedirectToPayment : undefined}
          />
        );
      case "payment-error":
        return <PaymentErrorPlug onAction={handleInitiatePayment} />;
      case "payment-success":
        return <PaymentSuccessPlug />;
      default:
        return null;
    }
  }, [
    paymentRedirectStatus,
    hasPaymentLink,
    handleInitiatePayment,
    handleRedirectToPayment,
  ]);

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
      title="Создаём платёж"
      description="Готовим оплату — это займёт несколько секунд. Деньги пока не списываются"
      iconClassName="animate-spin"
    />
  );
}

function InitiatePaymentErrorPlug({ onAction }: PlugWithActionProps) {
  return (
    <Plug
      size="lg"
      variant="negative"
      title="Не удалось создать платёж"
      description="Деньги не были списаны. Попробуйте ещё раз — если ошибка повторится, напишите в поддержку"
      actions={
        <Button
          size="lg"
          className="mt-2"
          icon={<RefreshCwIcon />}
          onClick={onAction}
        >
          Попробовать снова
        </Button>
      }
    />
  );
}

function PaymentLoadingPlug() {
  return (
    <Plug
      size="lg"
      icon={LoaderIcon}
      title="Проверяем статус платежа"
      description="Получаем информацию о вашем платеже от платёжной системы"
      iconClassName="animate-spin"
    />
  );
}

function PaymentPendingPlug({ onAction }: Partial<PlugWithActionProps>) {
  const actions = useMemo(() => {
    if (onAction) {
      return (
        <Button
          size="lg"
          className="mt-2"
          icon={<ArrowUpRightIcon />}
          onClick={onAction}
        >
          Перейти к оплате
        </Button>
      );
    }
  }, [onAction]);

  return (
    <Plug
      size="lg"
      icon={ClockIcon}
      title="Ожидаем подтверждения оплаты"
      description="Ждём ответа от платёжной системы — обычно это занимает меньше минуты. Как только оплата подтвердится, подписка или пакет кредитов активируются автоматически, страница обновится сама"
      actions={actions}
    />
  );
}

function PaymentErrorPlug({ onAction }: PlugWithActionProps) {
  return (
    <Plug
      size="lg"
      variant="negative"
      title="Платёж не прошёл"
      description="Оплата не была завершена: возможно, на карте не хватило средств или банк отклонил операцию. Попробуйте ещё раз или используйте другой способ оплаты"
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
      variant="positive"
      icon={CircleCheckIcon}
      title="Оплата прошла успешно!"
      description="Подписка или пакет кредитов уже активированы. Перенаправляем вас в личный кабинет"
    />
  );
}
