import { useMemo } from "react";

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
  isDarkTheme?: boolean;
  isPreferredTariff?: boolean;
};

export function LandingTariffsCardPrimaryAction({
  to,
  search,
  title,
  subtitle,
  isDarkTheme,
  isPreferredTariff,
}: LandingTariffsCardPrimaryActionProps) {
  const priority = useMemo(() => {
    if (isDarkTheme || isPreferredTariff) {
      return "primary";
    }

    return "tertiary";
  }, [isDarkTheme, isPreferredTariff]);

  return (
    <ButtonLink
      to={to}
      search={search}
      size="lg"
      variant={isPreferredTariff ? "accent" : "neutral"}
      priority={priority}
      className="w-full flex-col items-center gap-0"
    >
      {title}
      <span className="opacity-70">{subtitle}</span>
    </ButtonLink>
  );
}
