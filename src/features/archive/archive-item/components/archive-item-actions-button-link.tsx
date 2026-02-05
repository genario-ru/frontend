import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";

type ArchiveItemActionsButtonLinkProps = Omit<
  ButtonLinkProps,
  "state" | "color"
>;

export function ArchiveItemActionsButtonLink(
  props: ArchiveItemActionsButtonLinkProps,
) {
  return (
    <ButtonLink
      size="sm"
      variant="tertiary"
      className="w-full justify-start"
      {...props}
    />
  );
}
