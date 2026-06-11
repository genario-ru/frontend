import BankCardIcon from "@/assets/svgs/payment-methods/bank-card.svg";
import MastercardIcon from "@/assets/svgs/payment-methods/mastercard.svg";
import MirIcon from "@/assets/svgs/payment-methods/mir.svg";
import VisaIcon from "@/assets/svgs/payment-methods/visa.svg";
import type { CardCardTypeEnumKey } from "@/codegen/api/product";

import type { PaymentMethodDisplay } from "../types/payment-method-display-types";

export const bankCardTypeDisplay: Record<
  CardCardTypeEnumKey,
  PaymentMethodDisplay
> = {
  MasterCard: { title: "Mastercard", icon: MastercardIcon },
  Visa: { title: "Visa", icon: VisaIcon },
  Mir: { title: "Мир", icon: MirIcon },
  UnionPay: { title: "UnionPay", icon: BankCardIcon },
  JCB: { title: "JCB", icon: BankCardIcon },
  AmericanExpress: { title: "American Express", icon: BankCardIcon },
  DinersClub: { title: "Diners Club", icon: BankCardIcon },
  DiscoverCard: { title: "Discover", icon: BankCardIcon },
  InstaPayment: { title: "InstaPayment", icon: BankCardIcon },
  InstaPaymentTM: { title: "InstaPayment TM", icon: BankCardIcon },
  Laser: { title: "Laser", icon: BankCardIcon },
  Dankort: { title: "Dankort", icon: BankCardIcon },
  Solo: { title: "Solo", icon: BankCardIcon },
  Switch: { title: "Switch", icon: BankCardIcon },
  Unknown: { title: "Банковская карта", icon: BankCardIcon },
};
