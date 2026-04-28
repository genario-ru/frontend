import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

export function IdeasListIdeaCardSecondaryActionsMenuButton({
  className,
  ...props
}: ButtonProps) {
  return (
    <Button
      priority="tertiary"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
