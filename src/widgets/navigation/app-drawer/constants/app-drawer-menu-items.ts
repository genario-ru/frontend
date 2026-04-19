import type { NavigateOptions } from "@tanstack/react-router";
import {
  ArchiveIcon,
  BoltIcon,
  CreditCardIcon,
  HouseIcon,
  type LucideIcon,
  UsersRoundIcon,
} from "lucide-react";

type AppDrawerMenuItem = {
  label: string;
  to: NavigateOptions["to"];
  Icon: LucideIcon;
};

export const appDrawerMenuItems: AppDrawerMenuItem[] = [
  {
    label: "Главная",
    to: "/home",
    Icon: HouseIcon,
  },
  {
    label: "Архив",
    to: "/archive",
    Icon: ArchiveIcon,
  },
  {
    label: "Профили",
    to: "/profiles",
    Icon: UsersRoundIcon,
  },
  {
    label: "Подписка",
    to: "/billing",
    Icon: CreditCardIcon,
  },
  {
    label: "Настройки",
    to: "/settings",
    Icon: BoltIcon,
  },
];
