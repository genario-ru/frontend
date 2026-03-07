import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

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
  return (
    <ButtonLink
      to={to}
      search={search}
      size="lg"
      variant="accent"
      priority="primary"
      className={cn("w-full flex-col items-center gap-0", className)}
      {...props}
    >
      {title}
      <span className="opacity-70">{subtitle}</span>
    </ButtonLink>
  );
}
