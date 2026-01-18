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
      variant="tertiary"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
