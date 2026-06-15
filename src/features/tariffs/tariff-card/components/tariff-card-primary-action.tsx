import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

import { useTariffCardPrimaryAction } from "../hooks/use-tariff-card-primary-action";

type LandingTariffsCardPrimaryActionProps = Omit<ButtonLinkProps, "title"> & {
  title: string;
  subtitle?: string;
};

export function TariffCardPrimaryAction({
  to,
  search,
  title,
  subtitle,
  className,
  ...props
}: LandingTariffsCardPrimaryActionProps) {
  const { handleClick } = useTariffCardPrimaryAction();

  return (
    <ButtonLink
      to={to}
      search={search}
      size="lg"
      variant="accent"
      priority="primary"
      className={cn("w-full flex-col items-center gap-0", className)}
      onClick={handleClick}
      {...props}
    >
      {title}
      <span className="text-center text-sm opacity-70">{subtitle}</span>
    </ButtonLink>
  );
}
