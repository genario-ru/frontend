import {
  ArchiveIcon,
  BoltIcon,
  HouseIcon,
  LightbulbIcon,
  SwatchBookIcon,
  UsersRoundIcon,
} from "lucide-react";

import type { AppSidebarItem } from "../types";

export const appSidebarItems: AppSidebarItem[] = [
  {
    Icon: HouseIcon,
    label: "Главная",
    href: "/",
  },
  {
    Icon: ArchiveIcon,
    label: "Архив",
    href: "/archive",
  },
  {
    Icon: LightbulbIcon,
    label: "Идеи",
    href: "/ideas-lists",
  },
  {
    Icon: UsersRoundIcon,
    label: "Профили",
    href: "/profiles",
  },
  {
    Icon: BoltIcon,
    label: "Настройки",
    href: "/settings/account",
  },
  {
    Icon: SwatchBookIcon,
    label: "UI-kit",
    href: "/ui",
  },
];
