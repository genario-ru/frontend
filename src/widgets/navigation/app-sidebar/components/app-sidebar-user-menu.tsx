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
import { ProfileImage } from "@/shared/components/common/profile-image";
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
          <DropdownMenuItem asChild>
            <AppSidebarUserMenuButtonLink
              to="/settings"
              className="flex items-center gap-2 py-3"
            >
              <ProfileImage
                alt={sessionData?.user.name}
                uuid={sessionData?.user.id}
                size="lg"
              />
              <div className="flex flex-col">
                <p className="font-medium">{sessionData?.user.name}</p>
                <p className="text-neutral-7 text-sm">
                  {sessionData?.user.email}
                </p>
              </div>
            </AppSidebarUserMenuButtonLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <AppSidebarUserMenuButtonLink to="/settings" icon={<BoltIcon />}>
              Настройки
            </AppSidebarUserMenuButtonLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AppSidebarUserMenuButtonLink to="/home" icon={<WalletCardsIcon />}>
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
