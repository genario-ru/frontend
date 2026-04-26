import { LogOutIcon, MenuIcon } from "lucide-react";

import { useSessionFromContext } from "@/actions/auth/hooks/use-session-from-context";
import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { ThemeToggle } from "@/features/navigation/theme-toggle/components/theme-toggle";
import { UserInfo } from "@/features/navigation/user-info/components/user-info";
import { Logo } from "@/shared/components/common/logo";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Island } from "@/shared/components/ui/island";

import { appDrawerMenuItems } from "../constants/app-drawer-menu-items";

export function AppDrawer() {
  const sessionData = useSessionFromContext();
  const signOut = useSignOut();

  return (
    <Drawer>
      <DrawerTrigger
        render={(props, _state) => (
          <Button priority="tertiary" icon={<MenuIcon />} {...props} />
        )}
      />
      <DrawerContent>
        <DrawerHeader left={<Logo />} className="items-center py-3 pr-3 pl-4" />
        <Island className="p-1">
          <UserInfo
            id={sessionData.user.id}
            name={sessionData.user.name}
            email={sessionData.user.email}
          />
        </Island>
        <Island className="gap-1 p-1">
          {appDrawerMenuItems.map((item) => (
            <ButtonLink
              key={item.to}
              to={item.to}
              icon={<item.Icon />}
              iconPosition="left"
              priority="tertiary"
              align="start"
              className="w-full"
            >
              {item.label}
            </ButtonLink>
          ))}
        </Island>
        <Island className="p-1">
          <ThemeToggle
            withText
            align="start"
            iconPosition="left"
            className="w-full"
          />
        </Island>
        <Island grow roundedBottom={false} className="p-1">
          <Button
            variant="negative"
            priority="tertiary"
            className="w-full"
            iconPosition="left"
            align="start"
            icon={<LogOutIcon />}
            onClick={signOut}
          >
            Выйти
          </Button>
        </Island>
      </DrawerContent>
    </Drawer>
  );
}
