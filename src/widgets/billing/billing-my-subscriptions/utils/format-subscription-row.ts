import { format } from "date-fns";

import type { SubscriptionExtendedSchema } from "@/codegen/api/product";

export type SubscriptionRowData = {
  id: string;
  name: string;
  price: number;
  billingPeriod: SubscriptionExtendedSchema["tariff"]["billingPeriod"];
  status: SubscriptionExtendedSchema["status"];
  credits: number | null;
  durationDays: number | null;
  dateRange: string;
};

function formatDateRange(start: string | null, end: string | null): string {
  if (!start && !end) return "";
  const pattern = "dd.MM.yy";
  if (start && end) {
    return `${format(start, pattern)} — ${format(end, pattern)}`;
  }
  if (start) return `с ${format(start, pattern)}`;
  if (end) return `до ${format(end, pattern)}`;
  return "";
}

export function formatSubscriptionRow(
  subscription: SubscriptionExtendedSchema,
): SubscriptionRowData {
  const { tariff } = subscription;

  const credits = tariff.creditsPackage?.amount ?? null;

  const dateStart = subscription.cycleStartsAt ?? subscription.startsAt;
  const dateEnd = subscription.cycleEndsAt ?? subscription.endsAt;
  const dateRange = formatDateRange(dateStart, dateEnd);

  return {
    id: subscription.id,
    name: tariff.name,
    price: tariff.price,
    billingPeriod: tariff.billingPeriod,
    status: subscription.status,
    credits,
    durationDays: tariff.durationDays,
    dateRange,
  };
}
