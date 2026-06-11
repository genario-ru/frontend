import AlfaBankIcon from "@/assets/svgs/payment-methods/alfa-bank.svg";
import ApplePayIcon from "@/assets/svgs/payment-methods/apple-pay.svg";
import BankCardIcon from "@/assets/svgs/payment-methods/bank-card.svg";
import CashIcon from "@/assets/svgs/payment-methods/cash.svg";
import ElectronicCertificateIcon from "@/assets/svgs/payment-methods/electronic-certificate.svg";
import GooglePayIcon from "@/assets/svgs/payment-methods/google-pay.svg";
import MobileBalanceIcon from "@/assets/svgs/payment-methods/mobile-balance.svg";
import SberBnplIcon from "@/assets/svgs/payment-methods/sber-bnpl.svg";
import SberBusinessIcon from "@/assets/svgs/payment-methods/sber-business.svg";
import SberLoanIcon from "@/assets/svgs/payment-methods/sber-loan.svg";
import SberPayIcon from "@/assets/svgs/payment-methods/sber-pay.svg";
import SbpIcon from "@/assets/svgs/payment-methods/sbp.svg";
import TPayIcon from "@/assets/svgs/payment-methods/t-pay.svg";
import YooMoneyIcon from "@/assets/svgs/payment-methods/yoo-money.svg";
import type { DataTypeEnumKey } from "@/codegen/api/product";

import type { PaymentMethodDisplay } from "../types/payment-method-display-types";

export const paymentMethodTypeDisplay: Record<
  DataTypeEnumKey,
  PaymentMethodDisplay
> = {
  bank_card: { title: "Банковская карта", icon: BankCardIcon },
  cash: { title: "Наличные", icon: CashIcon },
  alfabank: { title: "Альфа-Клик", icon: AlfaBankIcon },
  webmoney: { title: "WebMoney", icon: BankCardIcon },
  wechat: { title: "WeChat Pay", icon: BankCardIcon },
  apple_pay: { title: "Apple Pay", icon: ApplePayIcon },
  google_pay: { title: "Google Pay", icon: GooglePayIcon },
  qiwi: { title: "QIWI Кошелёк", icon: BankCardIcon },
  installments: { title: "Заплатить по частям", icon: BankCardIcon },
  yoo_money: { title: "ЮMoney", icon: YooMoneyIcon },
  sberbank: { title: "SberPay", icon: SberPayIcon },
  mobile_balance: { title: "Баланс телефона", icon: MobileBalanceIcon },
  b2b_sberbank: { title: "СберБизнес", icon: SberBusinessIcon },
  tinkoff_bank: { title: "T-Pay", icon: TPayIcon },
  sbp: { title: "СБП", icon: SbpIcon },
  sber_loan: { title: "Кредит от СберБанка", icon: SberLoanIcon },
  electronic_certificate: {
    title: "Электронный сертификат",
    icon: ElectronicCertificateIcon,
  },
  sber_bnpl: { title: "Плати частями", icon: SberBnplIcon },
};
