import { Island } from "@/shared/components/ui/island";

import { BillingMyRecentOperationsList } from "./billing-my-recent-operations-list";

export function BillingMyRecentOperations() {
  return (
    <Island title="Последние операции">
      <BillingMyRecentOperationsList />
    </Island>
  );
}
