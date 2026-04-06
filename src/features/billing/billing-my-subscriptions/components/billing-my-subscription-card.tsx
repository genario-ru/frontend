import type {
  SubscriptionExtendedSchemaStatusEnumKey,
  TariffExtendedSchemaBillingPeriodEnumKey,
} from "@/codegen/api/product";
import { Button } from "@/shared/components/ui/button";
import { LDQUO, MDASH, NBSP, RDQUO } from "@/shared/constants/unicode";

import { billingPeriodSuffix } from "../constants/billing-period-suffix";
import { BillingMySubscriptionCardBadges } from "./billing-my-subscription-card-badges";

type BillingMySubscriptionCardProps = {
  name: string;
  price: number;
  billingPeriod: TariffExtendedSchemaBillingPeriodEnumKey | null;
  status: SubscriptionExtendedSchemaStatusEnumKey;
  credits: number | null;
  durationDays: number | null;
  dateRange: string;
  isCancellable: boolean;
  onCancelButtonClick: () => void;
};

export function BillingMySubscriptionCard({
  name,
  price,
  billingPeriod,
  status,
  credits,
  durationDays,
  dateRange,
  isCancellable,
  onCancelButtonClick,
}: BillingMySubscriptionCardProps) {
  const suffix = billingPeriod ? billingPeriodSuffix[billingPeriod] : null;

  return (
    <>
      <div className="group/card bg-neutral-2 relative flex justify-between gap-4 rounded-2xl px-4 py-3">
        <div className="flex flex-col gap-2">
          <p className="font-medium">
            Тариф
            {NBSP}
            {LDQUO}
            {name}
            {RDQUO}
            {NBSP}
            {MDASH}
            {NBSP}
            {price === 0 ? "Бесплатно" : `${price.toLocaleString("ru-RU")} руб`}
            {suffix && (
              <span className="text-neutral-6 text-sm font-normal">
                {suffix}
              </span>
            )}
          </p>
          <BillingMySubscriptionCardBadges
            status={status}
            credits={credits}
            billingPeriod={billingPeriod}
            durationDays={durationDays}
            dateRange={dateRange}
          />
        </div>
        {isCancellable && (
          <Button
            variant="negative"
            size="sm"
            className="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
            onClick={onCancelButtonClick}
          >
            Отменить
          </Button>
        )}
      </div>
    </>
  );
}
