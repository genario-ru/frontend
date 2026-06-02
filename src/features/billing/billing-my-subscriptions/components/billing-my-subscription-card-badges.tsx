import type {
  SubscriptionExtendedSchemaStatusEnumKey,
  TariffExtendedSchemaBillingPeriodEnumKey,
} from "@/codegen/api/product";
import { Badge } from "@/shared/components/ui/badge";

import { subscriptionStatusColor } from "../constants/subscription-status-color";
import { subscriptionStatusLabel } from "../constants/subscription-status-label";
import { subscriptionStatusVariant } from "../constants/subscription-status-variant";
import { formatBillingPeriod } from "../utils/format-billing-period";

type BillingMySubscriptionCardBadgesProps = {
  status: SubscriptionExtendedSchemaStatusEnumKey;
  credits: number | null;
  billingPeriod: TariffExtendedSchemaBillingPeriodEnumKey | null;
  durationDays: number | null;
  dateRange: string;
};

export function BillingMySubscriptionCardBadges({
  status,
  credits,
  billingPeriod,
  durationDays,
  dateRange,
}: BillingMySubscriptionCardBadgesProps) {
  const period = formatBillingPeriod(billingPeriod, durationDays);

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Badge
        color={subscriptionStatusColor[status]}
        variant={subscriptionStatusVariant[status]}
        size="sm"
      >
        {subscriptionStatusLabel[status]}
      </Badge>
      {credits != null && (
        <Badge color="neutral" variant="tertiary" size="sm">
          {credits.toLocaleString("ru-RU")} кредитов
        </Badge>
      )}
      {period && (
        <Badge color="neutral" variant="tertiary" size="sm">
          {period}
        </Badge>
      )}
      {dateRange && (
        <span className="text-neutral-7 text-xs font-medium">{dateRange}</span>
      )}
    </div>
  );
}
