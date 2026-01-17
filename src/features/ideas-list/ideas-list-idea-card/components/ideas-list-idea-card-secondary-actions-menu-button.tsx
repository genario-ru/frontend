import { Button, type ButtonProps } from "@/shared/components/ui/button";

export function IdeasListIdeaCardSecondaryActionsMenuButton(
  props: ButtonProps,
) {
  return (
    <Button variant="tertiary" className="w-full justify-start" {...props} />
  );
}
