import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type AppSidebarUserMenuButtonLinkProps = ButtonLinkProps;

export function AppSidebarUserMenuButtonLink({
  className,
  ...props
}: AppSidebarUserMenuButtonLinkProps) {
  return (
    <ButtonLink
      priority="tertiary"
      rounding="base"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
