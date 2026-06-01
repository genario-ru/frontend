import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const operationIconColor: Record<
  PaymentExtendedSchemaStatusEnumKey,
  string
> = {
  succeeded: "text-positive-5",
  failed: "text-negative-5",
  pending: "text-neutral-6",
  canceled: "text-neutral-6",
};
