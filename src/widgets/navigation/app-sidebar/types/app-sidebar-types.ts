import type { NavigateOptions } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type AppSidebarItem = {
  Icon: LucideIcon;
  label: string;
  to: NavigateOptions["to"];
  soon?: boolean;
  active?: boolean;
};
