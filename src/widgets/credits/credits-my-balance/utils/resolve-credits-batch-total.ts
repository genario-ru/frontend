import type { CreditsBatchExtendedSchema } from "@/codegen/api/product";

export function resolveCreditsBatchTotal(
  batch: CreditsBatchExtendedSchema,
): number {
  if (batch.creditsPackage?.amount != null) {
    return batch.creditsPackage.amount;
  }

  if (batch.remainingAmount > 0) {
    return batch.remainingAmount;
  }

  return 1;
}
