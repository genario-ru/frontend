import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type BillingMyRecentOperationsHeaderProps = {
  hasShadow?: boolean;
};

export function BillingMyRecentOperationsHeader({
  hasShadow = false,
}: BillingMyRecentOperationsHeaderProps) {
  return (
    <Island
      title="Последние операции"
      className={cn("sticky top-0 z-1 duration-200", {
        "shadow-bottom-1": hasShadow,
      })}
    />
  );
}
