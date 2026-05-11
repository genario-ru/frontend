import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";

type TemplateCardMenuButtonLinkProps = ButtonLinkProps;

export function TemplateCardMenuButtonLink(
  props: TemplateCardMenuButtonLinkProps,
) {
  return <ButtonLink priority="tertiary" {...props} />;
}
