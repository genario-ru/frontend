import { CreditCardIcon, Trash2Icon } from "lucide-react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { Button } from "@/shared/components/ui/button";

type BillingMyPaymentMethodCardProps = {
  paymentMethod: PaymentMethodSchema;
  isDeletePending: boolean;
  onDelete: () => void;
};

export function BillingMyPaymentMethodCard({
  paymentMethod,
  isDeletePending,
  onDelete,
}: BillingMyPaymentMethodCardProps) {
  const label = paymentMethod.title ?? paymentMethod.type;

  return (
    <div className="group/card border-neutral-3 bg-neutral-1 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3">
      <div className="flex items-center gap-3">
        <CreditCardIcon className="text-neutral-6 h-4 w-4" strokeWidth={1.5} />
        <span className="font-medium">{label}</span>
      </div>
      <Button
        variant="negative"
        priority="tertiary"
        size="sm"
        rounding="full"
        icon={<Trash2Icon />}
        state={isDeletePending ? "loading" : "default"}
        onClick={onDelete}
        aria-label="Удалить способ оплаты"
        className="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
      />
    </div>
  );
}
