import { Link } from "@tanstack/react-router";
import {
  BoltIcon,
  LogOutIcon,
  UserRoundIcon,
  WalletCardsIcon,
} from "lucide-react";

import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { ProfileImage } from "@/shared/components/common/profile-image";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export const AppSidebarUserMenu = () => {
  const signOut = useSignOut();
  const { data: sessionData } = useGetSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button icon={<UserRoundIcon />} variant="tertiary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/" className="gap-2">
              <ProfileImage
                src=""
                alt={sessionData?.user.name}
                uuid={sessionData?.user.id}
                size="lg"
              />
              <div>
                <p className="text-sm font-medium">{sessionData?.user.name}</p>
                <p className="text-neutral-7 text-xs">
                  {sessionData?.user.email}
                </p>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/">
              <BoltIcon size={20} className="stroke-neutral-8" />
              Настройки
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <WalletCardsIcon size={20} className="stroke-neutral-8" />
            Платежи
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={signOut}
            className="text-negative-6 hover:bg-negative-3 focus:bg-negative-3 active:bg-negative-3"
          >
            <LogOutIcon size={20} className="stroke-negative-6" />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
