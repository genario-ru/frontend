import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type CreditsUsageHeaderProps = {
  hasShadow?: boolean;
};

export function CreditsUsageHeader({
  hasShadow = false,
}: CreditsUsageHeaderProps) {
  return (
    <Island
      title="Расход кредитов"
      className={cn("sticky top-0 z-1 duration-200", {
        "shadow-bottom-1": hasShadow,
      })}
    />
  );
}
