import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";

type ArchiveItemActionsButtonLinkProps = Omit<
  ButtonLinkProps,
  "state" | "variant"
>;

export function ArchiveItemActionsButtonLink(
  props: ArchiveItemActionsButtonLinkProps,
) {
  return (
    <ButtonLink
      size="sm"
      priority="tertiary"
      rounding="base"
      className="w-full justify-start"
      {...props}
    />
  );
}
