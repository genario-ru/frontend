import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  BoltIcon,
  LogOutIcon,
  UserRoundIcon,
  WalletCardsIcon,
} from "lucide-react";

import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { AppSidebarUserMenuButtonLink } from "@/features/navigation/app-sidebar/components/app-sidebar-user-menu-button-link";
import { UserInfo } from "@/features/navigation/user-info/components/user-info";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export const AppSidebarUserMenu = () => {
  const signOut = useSignOut();
  const { sessionData } = useGetSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button icon={<UserRoundIcon />} priority="tertiary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-64">
        <DropdownMenuGroup>
          {sessionData && (
            <DropdownMenuItem asChild>
              <UserInfo
                id={sessionData?.user.id}
                name={sessionData?.user.name}
                email={sessionData?.user.email}
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <AppSidebarUserMenuButtonLink to="/settings" icon={<BoltIcon />}>
              Настройки
            </AppSidebarUserMenuButtonLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AppSidebarUserMenuButtonLink
              priority="tertiary"
              to="/billing"
              icon={<WalletCardsIcon />}
            >
              Платежи
            </AppSidebarUserMenuButtonLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signOut} asChild>
            <Button
              priority="tertiary"
              variant="negative"
              rounding="base"
              icon={<LogOutIcon />}
              className="w-full justify-start"
            >
              Выйти
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
