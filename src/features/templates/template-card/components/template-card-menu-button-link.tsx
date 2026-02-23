import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";

type TemplateCardMenuButtonLinkProps = ButtonLinkProps;

export function TemplateCardMenuButtonLink(
  props: TemplateCardMenuButtonLinkProps,
) {
  return (
    <ButtonLink
      priority="tertiary"
      className="bg-neutral-1 relative"
      {...props}
    />
  );
}
