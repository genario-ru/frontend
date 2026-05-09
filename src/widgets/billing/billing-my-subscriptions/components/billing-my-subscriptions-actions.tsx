import { ArrowUpRightIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

import { useBillingMySubscriptionsActions } from "../hooks/use-billing-my-subscriptions-actions";

export function BillingMySubscriptionsActions() {
  const { showUpgradeButton } = useBillingMySubscriptionsActions();

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <ButtonLink
        icon={<ArrowUpRightIcon />}
        to="/tariffs"
        variant="neutral"
        priority="secondary"
      >
        Все доступные тарифы
      </ButtonLink>
      {showUpgradeButton && (
        <ButtonLink to="/tariffs" variant="accent" priority="primary">
          Улучшить
        </ButtonLink>
      )}
    </div>
  );
}
