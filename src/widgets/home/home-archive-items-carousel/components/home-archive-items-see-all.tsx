import { ArrowRightIcon } from "lucide-react";

import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type HomeArchiveItemsSeeAllProps = ButtonLinkProps;

export function HomeArchiveItemsSeeAll({
  className,
  ...props
}: HomeArchiveItemsSeeAllProps) {
  return (
    <ButtonLink
      to="/archive"
      variant="tertiary"
      className={cn("border-neutral-3 h-full w-full border", className)}
      icon={<ArrowRightIcon />}
      {...props}
    >
      Смотреть все
    </ButtonLink>
  );
}
