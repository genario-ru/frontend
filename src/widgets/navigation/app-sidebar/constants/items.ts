import {
  ArchiveIcon,
  BoltIcon,
  CreditCardIcon,
  HouseIcon,
  UsersRoundIcon,
} from "lucide-react";

import type { AppSidebarItem } from "../types/app-sidebar-types";

export const appSidebarItems: AppSidebarItem[] = [
  {
    Icon: HouseIcon,
    label: "Главная",
    to: "/home",
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
    Icon: CreditCardIcon,
    label: "Подписка",
    to: "/billing",
  },
  {
    Icon: BoltIcon,
    label: "Настройки",
    to: "/settings",
  },
];
