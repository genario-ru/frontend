import cookies from "js-cookie";
import { type PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";

import { TooltipProvider } from "@/shared/components/ui/tooltip";

import {
  APP_SIDEBAR_COOKIE_MAX_AGE,
  APP_SIDEBAR_COOKIE_NAME,
  APP_SIDEBAR_KEYBOARD_SHORTCUT,
} from "../constants/defaults";
import { AppSidebarContext } from "../hooks/use-app-sidebar";
import type { AppSidebarContextProps } from "../types/app-sidebar-types";

type AppSidebarProviderProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export const AppSidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
}: AppSidebarProviderProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openMobile, setOpenMobile] = useState(false);

  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      cookies.set(APP_SIDEBAR_COOKIE_NAME, String(openState), {
        maxAge: APP_SIDEBAR_COOKIE_MAX_AGE,
      });
    },
    [setOpenProp, open],
  );

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === APP_SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    },
    [toggleSidebar],
  );

  // Добавляем слушатель на нажатие кнопки триггера
  useEventListener("keydown", handleKeyDown);

  // Добавляем стейт, чтобы мы могли использовать data-state="expanded" or "collapsed".
  // Так удобнее работать с Tailwind классами.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<AppSidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <AppSidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </AppSidebarContext.Provider>
  );
};
