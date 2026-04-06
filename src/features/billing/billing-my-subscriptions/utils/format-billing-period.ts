import type { TariffExtendedSchemaBillingPeriodEnumKey } from "@/codegen/api/product";

export function formatBillingPeriod(
  billingPeriod: TariffExtendedSchemaBillingPeriodEnumKey | null,
  durationDays: number | null,
): string | null {
  if (billingPeriod === "month") return "На месяц";
  if (billingPeriod === "year") return "На год";

  if (durationDays != null) {
    if (durationDays === 1) return "На 1 день";
    if (durationDays < 5) return `На ${durationDays} дня`;

    return `На ${durationDays} дней`;
  }

  return null;
}
