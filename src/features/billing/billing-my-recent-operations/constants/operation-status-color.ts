import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const operationStatusColor: Record<
  PaymentExtendedSchemaStatusEnumKey,
  "positive" | "negative" | "neutral"
> = {
  pending: "neutral",
  succeeded: "positive",
  canceled: "negative",
  failed: "negative",
};
