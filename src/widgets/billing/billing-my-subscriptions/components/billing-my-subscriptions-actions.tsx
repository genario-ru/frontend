import { ButtonLink } from "@/shared/components/ui/button-link";

import { useBillingMySubscriptionsActions } from "../hooks/use-billing-my-subscriptions-actions";

export function BillingMySubscriptionsActions() {
  const { showUpgradeButton } = useBillingMySubscriptionsActions();

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <ButtonLink
        to="/tariffs"
        variant="neutral"
        priority="secondary"
        size="sm"
      >
        Все доступные тарифы
      </ButtonLink>
      {showUpgradeButton && (
        <ButtonLink to="/tariffs" variant="accent" priority="primary" size="sm">
          Улучшить
        </ButtonLink>
      )}
    </div>
  );
}
