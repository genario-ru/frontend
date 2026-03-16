import type { ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

import { AppMenubarButton } from "./app-menubar-button";

type AppMenubarDropdownMenuButtonProps = ButtonProps;

export function AppMenubarDropdownMenuButton({
  className,
  ...props
}: AppMenubarDropdownMenuButtonProps) {
  return (
    <AppMenubarButton
      align="between"
      className={cn("w-full", className)}
      {...props}
    />
  );
}
