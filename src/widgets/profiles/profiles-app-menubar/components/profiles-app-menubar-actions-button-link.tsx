import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type ProfilesAppMenubarActionsButtonLinkProps = ButtonLinkProps;

export function ProfilesAppMenubarActionsButtonLink({
  className,
  ...props
}: ProfilesAppMenubarActionsButtonLinkProps) {
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
