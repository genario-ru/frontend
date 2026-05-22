import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type CreditsPackagesListHeaderProps = {
  hasShadow?: boolean;
};

export function CreditsPackagesListHeader({
  hasShadow = false,
}: CreditsPackagesListHeaderProps) {
  return (
    <Island
      title="Пакеты кредитов"
      className={cn("sticky top-0 z-1 duration-200", {
        "shadow-bottom-1": hasShadow,
      })}
    />
  );
}
