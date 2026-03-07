import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

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
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "text-neutral-8/70 hover:text-neutral-8 underline duration-200",
        className,
      )}
      {...props}
    >
      {title}
    </Link>
  );
}
