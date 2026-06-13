import type { SubscriptionExtendedSchema } from "@/codegen/api/product";

// Активность подписки определяется только статусом: даты окончания
// обрабатывает биллинг на бэке, который переводит истекшие подписки
// в статус "terminated".
export function checkHasActiveSubscription(
  subscriptions: SubscriptionExtendedSchema[],
) {
  const activeSubscriptions = subscriptions.filter((subscription) =>
    ["active", "cancelled", "overdue"].includes(subscription.status),
  );

  return activeSubscriptions.length > 0;
}
