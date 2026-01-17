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
      variant="tertiary"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
