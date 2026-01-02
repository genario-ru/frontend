import { createContext, useContext } from "react";

import type { AppSidebarContextProps } from "../types";

export const AppSidebarContext = createContext<AppSidebarContextProps | null>(
  null,
);

export const useAppSidebar = () => {
  const context = useContext(AppSidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
};
