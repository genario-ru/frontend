import { Island } from "@/shared/components/ui/island";
import { ScrollContainer } from "@/shared/components/ui/scroll-container";

import { useBillingMyRecentOperations } from "../hooks/use-billing-my-recent-operations";
import { BillingMyRecentOperationsHeader } from "./billing-my-recent-operations-header";
import { BillingMyRecentOperationsList } from "./billing-my-recent-operations-list";

export function BillingMyRecentOperations() {
  const { scrollContainerRef, isScrolled } = useBillingMyRecentOperations();

  return (
    <ScrollContainer
      outerProps={{ className: "rounded-4 bg-neutral-1 h-full" }}
      innerProps={{ ref: scrollContainerRef }}
    >
      <BillingMyRecentOperationsHeader hasShadow={isScrolled} />
      <Island grow roundedBottom={false} roundedTop={false} className="pt-0">
        <BillingMyRecentOperationsList />
      </Island>
    </ScrollContainer>
  );
}
