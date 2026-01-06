import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

type HomeAppMenubarActionsButtonProps = ButtonProps;

export function HomeAppMenubarActionsButton({
  className,
  ...props
}: HomeAppMenubarActionsButtonProps) {
  return (
    <Button
      variant="tertiary"
      className={cn("w-full justify-start", className)}
      {...props}
    />
  );
}
