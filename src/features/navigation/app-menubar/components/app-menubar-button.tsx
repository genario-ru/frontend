import { Button, type ButtonProps } from "@/shared/components/ui/button";

type AppMenubarButtonProps = ButtonProps;

export function AppMenubarButton(props: AppMenubarButtonProps) {
  return <Button priority="tertiary" {...props} />;
}
