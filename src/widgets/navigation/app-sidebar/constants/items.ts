import { ArchiveIcon, BoltIcon, HouseIcon, UsersRoundIcon } from "lucide-react";

import type { AppSidebarItem } from "../types/app-sidebar-types";

export const appSidebarItems: AppSidebarItem[] = [
  {
    Icon: HouseIcon,
    label: "Главная",
    to: "/",
  },
  {
    Icon: ArchiveIcon,
    label: "Архив",
    to: "/archive",
  },
  {
    Icon: UsersRoundIcon,
    label: "Профили",
    to: "/profiles",
  },
  {
    Icon: BoltIcon,
    label: "Настройки",
    to: "/settings/account",
  },
];
