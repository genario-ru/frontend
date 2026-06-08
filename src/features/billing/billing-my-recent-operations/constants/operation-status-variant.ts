import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const operationStatusVariant: Record<
  PaymentExtendedSchemaStatusEnumKey,
  "secondary" | "tertiary"
> = {
  pending: "tertiary",
  succeeded: "secondary",
  canceled: "secondary",
  failed: "secondary",
};
