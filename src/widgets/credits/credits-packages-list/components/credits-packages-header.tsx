import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type CreditsPackagesHeaderProps = {
  hasShadow?: boolean;
};

export function CreditsPackagesHeader({
  hasShadow = false,
}: CreditsPackagesHeaderProps) {
  return (
    <Island
      title="Пакеты кредитов"
      className={cn("sticky top-0 duration-200", {
        "shadow-bottom-1": hasShadow,
      })}
    />
  );
}
