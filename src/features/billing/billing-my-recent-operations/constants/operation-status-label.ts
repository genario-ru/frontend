import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const operationStatusLabel: Record<
  PaymentExtendedSchemaStatusEnumKey,
  string
> = {
  pending: "В ожидании",
  succeeded: "Успешно",
  canceled: "Отменён",
  failed: "Ошибка",
};
