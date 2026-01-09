import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

type ArchiveAppMenubarActionsButtonProps = ButtonProps;

export function ArchiveAppMenubarActionsButton({
  className,
  ...props
}: ArchiveAppMenubarActionsButtonProps) {
  return (
    <Button
      variant="tertiary"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
