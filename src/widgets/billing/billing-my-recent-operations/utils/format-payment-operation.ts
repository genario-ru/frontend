import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

import type { PaymentExtendedSchema } from "@/codegen/api/product";

function formatOperationTitle(payment: PaymentExtendedSchema): string {
  if (payment.subscription) {
    return "Оплата подписки";
  }

  if (payment.creditsBatch) {
    return "Покупка кредитов";
  }

  return "Платёж";
}

function formatAmount(amount: number, currency: string): string {
  const currencySymbol = currency.toUpperCase() === "RUB" ? "₽" : currency;
  return `${amount.toLocaleString("ru-RU")} ${currencySymbol}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Сегодня, ${format(date, "HH:mm:ss")}`;
  }

  if (isYesterday(date)) {
    return `Вчера, ${format(date, "HH:mm:ss")}`;
  }

  return format(date, "d MMMM yyyy, HH:mm:ss", { locale: ru });
}

export function formatPaymentOperation(payment: PaymentExtendedSchema) {
  return {
    id: payment.id,
    title: formatOperationTitle(payment),
    status: payment.status,
    tariffName: payment.subscription?.tariff.name ?? null,
    formattedAmount: formatAmount(payment.amount, payment.currency),
    formattedDate: formatDate(payment.createdAt),
    paymentLink: payment.paymentLink,
  };
}
