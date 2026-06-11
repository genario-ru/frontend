import type { PaymentMethodSchema } from "@/codegen/api/product";

import { bankCardSourceDisplay } from "../constants/bank-card-source-display";
import { bankCardTypeDisplay } from "../constants/bank-card-type-display";
import { paymentMethodTypeDisplay } from "../constants/payment-method-type-display";
import type { PaymentMethodDisplay } from "../types/payment-method-display-types";

type PaymentMethodData = PaymentMethodSchema["data"];

type PaymentMethodDataCard = NonNullable<
  Extract<PaymentMethodData, { card?: unknown }>["card"]
>;

function getPaymentMethodDataCard(
  data: PaymentMethodData,
): PaymentMethodDataCard | undefined {
  if ("card" in data) {
    return data.card;
  }

  return undefined;
}

function withCardLast4(
  display: PaymentMethodDisplay,
  last4: string,
): PaymentMethodDisplay {
  return { ...display, title: `${display.title} •• ${last4}` };
}

function getBankCardDisplay(
  card: PaymentMethodDataCard | undefined,
): PaymentMethodDisplay {
  if (!card) {
    return paymentMethodTypeDisplay.bank_card;
  }

  // Карта, сохранённая в Mir Pay / Apple Pay / Google Pay, показывается как кошелёк.
  const source = "source" in card ? card.source : undefined;
  const display = source
    ? bankCardSourceDisplay[source]
    : bankCardTypeDisplay[card.card_type];

  return withCardLast4(display, card.last4);
}

function getYooMoneyDisplay(data: PaymentMethodData): PaymentMethodDisplay {
  const display = paymentMethodTypeDisplay.yoo_money;
  const accountNumber =
    "account_number" in data ? data.account_number : undefined;

  if (!accountNumber) {
    return display;
  }

  return withCardLast4(display, accountNumber.slice(-4));
}

export function getPaymentMethodDisplay(
  paymentMethod: PaymentMethodSchema,
): PaymentMethodDisplay {
  const { data } = paymentMethod;

  if (data.type === "bank_card") {
    return getBankCardDisplay(getPaymentMethodDataCard(data));
  }

  if (data.type === "yoo_money") {
    return getYooMoneyDisplay(data);
  }

  const display = paymentMethodTypeDisplay[data.type];
  const card = getPaymentMethodDataCard(data);

  // SberPay, T-Pay и подобные могут содержать данные привязанной карты.
  if (card) {
    return withCardLast4(display, card.last4);
  }

  return display;
}
