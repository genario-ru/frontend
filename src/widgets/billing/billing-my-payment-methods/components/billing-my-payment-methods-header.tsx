import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type BillingMyPaymentMethodsHeaderProps = {
  hasShadow?: boolean;
};

export function BillingMyPaymentMethodsHeader({
  hasShadow = false,
}: BillingMyPaymentMethodsHeaderProps) {
  return (
    <Island
      title="Способы оплаты"
      className={cn("sticky top-0 z-1 duration-200", {
        "shadow-bottom-1": hasShadow,
      })}
    />
  );
}
