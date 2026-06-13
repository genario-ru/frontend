import type { SubscriptionExtendedSchema } from "@/codegen/api/product";

// Видимость подписки определяется только статусом: отмененная подписка
// действует до конца оплаченного периода, после чего биллинг на бэке
// переводит ее в статус "terminated".
export function isVisibleSubscription(
  subscription: SubscriptionExtendedSchema,
): boolean {
  return ["active", "pending", "cancelled", "overdue"].includes(
    subscription.status,
  );
}
