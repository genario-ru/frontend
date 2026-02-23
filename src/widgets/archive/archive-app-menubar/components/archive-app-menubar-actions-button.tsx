import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type ArchiveAppMenubarActionsButtonLinkProps = ButtonLinkProps;

export function ArchiveAppMenubarActionsButtonLink({
  className,
  ...props
}: ArchiveAppMenubarActionsButtonLinkProps) {
  return (
    <ButtonLink
      priority="tertiary"
      rounding="base"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
