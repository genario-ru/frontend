import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type TemplateCardMenuButtonLinkProps = ButtonLinkProps;

export function TemplateCardMenuButtonLink({
  className,
  ...props
}: TemplateCardMenuButtonLinkProps) {
  return (
    <ButtonLink
      priority="tertiary"
      className={cn("w-full flex-1 text-center", className)}
      {...props}
    />
  );
}
