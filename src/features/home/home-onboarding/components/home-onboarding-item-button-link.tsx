import { ArrowUpRightIcon } from "lucide-react";

import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type HomeOnboardingItemButtonLinkProps = ButtonLinkProps;

export function HomeOnboardingItemButtonLink({
  className,
  ...props
}: HomeOnboardingItemButtonLinkProps) {
  return (
    <ButtonLink
      variant="accent"
      priority="primary"
      icon={<ArrowUpRightIcon />}
      className={cn("w-full", className)}
      {...props}
    />
  );
}
