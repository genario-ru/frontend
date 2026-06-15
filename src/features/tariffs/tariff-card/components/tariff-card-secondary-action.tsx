import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

import { useTariffCardSecondaryAction } from "../hooks/use-tariff-card-secondary-action";

type TariffCardSecondaryActionProps = Omit<LinkComponentProps, "title"> & {
  title: string;
};

export function TariffCardSecondaryAction({
  to,
  search,
  title,
  className,
  ...props
}: TariffCardSecondaryActionProps) {
  const { handleClick } = useTariffCardSecondaryAction();

  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "text-neutral-8/70 hover:text-neutral-8 underline duration-200",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {title}
    </Link>
  );
}
