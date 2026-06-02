import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const operationIconColor: Record<
  PaymentExtendedSchemaStatusEnumKey,
  string
> = {
  succeeded: "stroke-positive-5",
  failed: "stroke-negative-5",
  pending: "stroke-neutral-6",
  canceled: "stroke-negative-5",
};
