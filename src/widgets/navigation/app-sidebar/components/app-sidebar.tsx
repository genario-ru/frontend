import { BellIcon } from "lucide-react";

import { AppSidebarContent } from "@/features/navigation/app-sidebar/components/app-sidebar-content";
import { AppSidebarFooter } from "@/features/navigation/app-sidebar/components/app-sidebar-footer";
import { AppSidebarMenuLink } from "@/features/navigation/app-sidebar/components/app-sidebar-menu-link";
import { ThemeToggle } from "@/features/navigation/theme-toggle/components/theme-toggle";
import { LogoLink } from "@/shared/components/common/logo-link";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

import { appSidebarItems } from "../constants/items";
import { AppSidebarLayout } from "./app-sidebar-layout";
import { AppSidebarUserMenu } from "./app-sidebar-user-menu";

export const AppSidebar = () => {
  return (
    <AppSidebarLayout>
      <LogoLink
        href="/home"
        className="rounded-t-5 flex w-full items-center justify-center p-5"
      />
      <AppSidebarContent>
        {appSidebarItems.map(({ Icon, label, to, soon, active = true }) => (
          <AppSidebarMenuLink
            to={to}
            key={to}
            className={cn({ "pointer-events-none": !active })}
          >
            <Icon />
            {label}
            {soon && (
              <Badge size="sm" variant="secondary">
                Скоро
              </Badge>
            )}
          </AppSidebarMenuLink>
        ))}
      </AppSidebarContent>
      <AppSidebarFooter>
        <AppSidebarUserMenu />
        <ThemeToggle />
        <Button priority="tertiary" icon={<BellIcon />} />
      </AppSidebarFooter>
    </AppSidebarLayout>
  );
};
