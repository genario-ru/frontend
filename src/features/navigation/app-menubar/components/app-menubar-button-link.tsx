import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";

type AppMenubarButtonLinkProps = ButtonLinkProps;

export function AppMenubarButtonLink(props: AppMenubarButtonLinkProps) {
  return <ButtonLink align="between" priority="tertiary" {...props} />;
}
