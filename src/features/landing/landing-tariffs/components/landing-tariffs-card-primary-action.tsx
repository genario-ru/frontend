import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";

type LandingTariffsCardPrimaryActionProps = Pick<
  ButtonLinkProps,
  "to" | "search"
> & {
  title: string;
  subtitle?: string;
  isPreferredTariff?: boolean;
};

export function LandingTariffsCardPrimaryAction({
  to,
  search,
  title,
  subtitle,
  isPreferredTariff,
}: LandingTariffsCardPrimaryActionProps) {
  return (
    <ButtonLink
      to={to}
      search={search}
      size="lg"
      variant={isPreferredTariff ? "accent" : "neutral"}
      priority={isPreferredTariff ? "primary" : "tertiary"}
      className="w-full flex-col items-center gap-0"
    >
      {title}
      <span className="opacity-70">{subtitle}</span>
    </ButtonLink>
  );
}
