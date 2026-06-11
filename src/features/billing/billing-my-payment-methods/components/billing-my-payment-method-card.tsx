import { StarIcon, Trash2Icon } from "lucide-react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { usePaymentMethodDisplay } from "@/features/billing/payment-method-display/hooks/use-payment-method-display";
import { Button } from "@/shared/components/ui/button";
import { SvgIcon } from "@/shared/components/ui/svg-icon";
import { cn } from "@/shared/utils/cn";

type BillingMyPaymentMethodCardProps = {
  paymentMethod: PaymentMethodSchema;
  hideActions?: boolean;
  onDelete: () => void;
  onMakeDefault: () => void;
};

export function BillingMyPaymentMethodCard({
  paymentMethod,
  hideActions = false,
  onDelete,
  onMakeDefault,
}: BillingMyPaymentMethodCardProps) {
  const { title, icon } = usePaymentMethodDisplay(paymentMethod);
  const isDefault = paymentMethod.default;

  return (
    <div className="bg-neutral-2 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <SvgIcon icon={icon} className="stroke-transparent" />
        <span className="truncate font-medium">{title}</span>
      </div>
      {!hideActions && (
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            size="sm"
            icon={<StarIcon className={cn({ "fill-neutral-8": isDefault })} />}
            aria-label="Сделать основным"
            onClick={onMakeDefault}
          />
          <Button
            type="button"
            size="sm"
            variant="negative"
            priority="tertiary"
            icon={<Trash2Icon />}
            aria-label="Удалить"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
}
