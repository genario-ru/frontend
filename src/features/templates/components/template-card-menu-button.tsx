import { Button, type ButtonProps } from "@/shared/components/ui/button";

type TemplateCardMenuButtonProps = ButtonProps;

export function TemplateCardMenuButton(props: TemplateCardMenuButtonProps) {
  return (
    <Button variant="tertiary" className="bg-neutral-1 relative" {...props} />
  );
}
