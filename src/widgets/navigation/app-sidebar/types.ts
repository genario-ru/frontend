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
  href: string;
  soon?: boolean;
  active?: boolean;
};
