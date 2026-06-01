import { StarIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

type BillingMyPaymentMethodSwipeActionsProps = {
  onDelete: () => void;
};

const swipeActionClassName =
  "h-full min-h-0 min-w-18 w-full max-w-none flex-1 shrink self-stretch justify-center";

export function BillingMyPaymentMethodSwipeActions({
  onDelete,
}: BillingMyPaymentMethodSwipeActionsProps) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-min flex-1 items-stretch gap-2">
      <Button
        type="button"
        variant="neutral"
        priority="tertiary"
        size="sm"
        direction="column"
        iconPosition="left"
        icon={<StarIcon />}
        className={swipeActionClassName}
        onClick={() => {}}
      >
        Сделать основным
      </Button>
      <Button
        type="button"
        variant="negative"
        priority="secondary"
        size="sm"
        direction="column"
        iconPosition="left"
        icon={<Trash2Icon />}
        className={swipeActionClassName}
        onClick={onDelete}
      >
        Удалить
      </Button>
    </div>
  );
}
