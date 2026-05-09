import { XIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

type BillingMySubscriptionSwipeActionsProps = {
  onCancelButtonClick: () => void;
};

export function BillingMySubscriptionSwipeActions({
  onCancelButtonClick,
}: BillingMySubscriptionSwipeActionsProps) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-min flex-1 items-stretch">
      <Button
        type="button"
        variant="negative"
        size="sm"
        direction="column"
        iconPosition="left"
        icon={<XIcon />}
        className="h-full min-h-0 w-full max-w-none min-w-24 flex-1 shrink justify-center self-stretch"
        onClick={onCancelButtonClick}
      >
        Отменить
      </Button>
    </div>
  );
}
