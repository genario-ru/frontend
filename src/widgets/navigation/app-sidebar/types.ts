import type { NavigateOptions } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type AppSidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export type AppSidebarItem = {
  Icon: LucideIcon;
  label: string;
  to: NavigateOptions["to"];
  soon?: boolean;
  active?: boolean;
};
