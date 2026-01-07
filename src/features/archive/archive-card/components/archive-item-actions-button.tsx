import { Button, type ButtonProps } from "@/shared/components/ui/button";

type ArchiveItemActionsButtonProps = ButtonProps;

export function ArchiveItemActionsButton(props: ArchiveItemActionsButtonProps) {
  return (
    <Button variant="tertiary" className="w-full justify-start" {...props} />
  );
}
