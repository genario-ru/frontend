import { StarIcon, Trash2Icon } from "lucide-react";
import { useMemo } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { usePaymentMethodDisplay } from "@/features/billing/payment-method-display/hooks/use-payment-method-display";
import { Button } from "@/shared/components/ui/button";
import { Item } from "@/shared/components/ui/item";
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

  const right = useMemo(() => {
    if (hideActions) {
      return null;
    }

    return (
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
    );
  }, [hideActions, isDefault, onDelete, onMakeDefault]);

  return (
    <Item
      icon={<SvgIcon icon={icon} className="stroke-transparent" />}
      title={<span className="truncate">{title}</span>}
      right={right}
    />
  );
}
