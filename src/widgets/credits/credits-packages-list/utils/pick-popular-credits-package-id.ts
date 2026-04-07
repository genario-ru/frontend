import type { CreditsPackageSchema } from "@/codegen/api/product";

export function pickPopularCreditsPackageId(
  packages: CreditsPackageSchema[],
): string | null {
  const purchasable = [...packages]
    .filter((pkg) => pkg.forPurchase)
    .sort((a, b) => a.amount - b.amount);

  if (purchasable.length === 0) {
    return null;
  }

  const mid = Math.floor((purchasable.length - 1) / 2);
  return purchasable[mid]?.id ?? null;
}
