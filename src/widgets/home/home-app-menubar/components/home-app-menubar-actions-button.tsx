import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type HomeAppMenubarActionsButtonLinkProps = ButtonLinkProps;

export function HomeAppMenubarActionsButtonLink({
  className,
  ...props
}: HomeAppMenubarActionsButtonLinkProps) {
  return (
    <ButtonLink
      priority="tertiary"
      rounding="base"
      align="start"
      className={cn("w-full", className)}
      {...props}
    />
  );
}
