import { PanelLeftIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/shared/components/ui/button";

import { useAppSidebar } from "../../../../widgets/navigation/app-sidebar/hooks/use-app-sidebar";

type AppSidebarTriggerProps = ComponentProps<typeof Button>;

export const AppSidebarTrigger = ({
  className,
  ...props
}: AppSidebarTriggerProps) => {
  const { toggleSidebar } = useAppSidebar();

  return (
    <Button
      icon={<PanelLeftIcon />}
      variant="tertiary"
      onClick={toggleSidebar}
      className={className}
      {...props}
    />
  );
};
