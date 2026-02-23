import { Button, type ButtonProps } from "@/shared/components/ui/button";

type ArchiveItemActionsButtonProps = ButtonProps;

export function ArchiveItemActionsButton(props: ArchiveItemActionsButtonProps) {
  return (
    <Button
      size="sm"
      priority="tertiary"
      rounding="base"
      className="w-full justify-start"
      {...props}
    />
  );
}
