import { Link, type LinkProps } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

type LandingTariffsCardPrimaryActionProps = Pick<LinkProps, "to" | "search"> & {
  title: string;
  inverseColors?: boolean;
};

export function LandingTariffsCardSecondaryAction({
  to,
  search,
  title,
  inverseColors = false,
}: LandingTariffsCardPrimaryActionProps) {
  return (
    <Link
      to={to}
      search={search}
      className={cn("underline duration-200", {
        "text-neutral-7 hover:text-neutral-8": !inverseColors,
        "text-neutral-3 hover:text-neutral-1": inverseColors,
      })}
    >
      {title}
    </Link>
  );
}
