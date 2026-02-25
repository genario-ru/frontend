import { BellIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "tanstack-theme-kit";

import { AppSidebarContent } from "@/features/navigation/app-sidebar/components/app-sidebar-content";
import { AppSidebarFooter } from "@/features/navigation/app-sidebar/components/app-sidebar-footer";
import { AppSidebarHeader } from "@/features/navigation/app-sidebar/components/app-sidebar-header";
import { AppSidebarMenu } from "@/features/navigation/app-sidebar/components/app-sidebar-menu";
import { AppSidebarMenuItem } from "@/features/navigation/app-sidebar/components/app-sidebar-menu-item";
import { AppSidebarMenuLink } from "@/features/navigation/app-sidebar/components/app-sidebar-menu-link";
import { Logo } from "@/shared/components/common/logo";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

import { appSidebarItems } from "../constants/items";
import { AppSidebarLayout } from "./app-sidebar-layout";
import { AppSidebarUserMenu } from "./app-sidebar-user-menu";

export const AppSidebar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <AppSidebarLayout>
      <AppSidebarHeader>
        <AppSidebarMenu>
          <AppSidebarMenuItem>
            <Logo
              href="/home"
              className="rounded-t-5 flex h-full w-full items-center justify-center p-5"
            />
          </AppSidebarMenuItem>
        </AppSidebarMenu>
      </AppSidebarHeader>
      <AppSidebarContent>
        <AppSidebarMenu>
          {appSidebarItems.map(({ Icon, label, to, soon, active = true }) => (
            <AppSidebarMenuItem key={to}>
              <AppSidebarMenuLink
                to={to}
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
            </AppSidebarMenuItem>
          ))}
        </AppSidebarMenu>
      </AppSidebarContent>
      <AppSidebarFooter className="gap-2">
        <AppSidebarMenu className="flex-row justify-between gap-1">
          <AppSidebarMenuItem>
            <AppSidebarUserMenu />
          </AppSidebarMenuItem>
          <AppSidebarMenuItem>
            <Button
              priority="tertiary"
              onClick={toggleTheme}
              icon={
                <>
                  <MoonIcon className="dark:opacity-0" />
                  <SunIcon className="absolute opacity-0 dark:opacity-100" />
                </>
              }
            />
          </AppSidebarMenuItem>
          <AppSidebarMenuItem>
            <Button priority="tertiary" icon={<BellIcon />} />
          </AppSidebarMenuItem>
        </AppSidebarMenu>
      </AppSidebarFooter>
    </AppSidebarLayout>
  );
};
