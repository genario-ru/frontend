import type { ComponentProps, CSSProperties } from "react";

import { Island } from "@/shared/components/ui/island";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { cn } from "@/shared/utils/cn";

import {
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_MOBILE,
} from "../constants/defaults";
import { useAppSidebar } from "../hooks/use-app-sidebar";

export const AppSidebarLayout = ({
  style,
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  const { isMobile, openMobile, setOpenMobile } = useAppSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          side="left"
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-new-neutral-1 w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": APP_SIDEBAR_WIDTH_MOBILE,
            } as CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>App Sidebar</SheetTitle>
            <SheetDescription>Мобильный сайдбар</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Island
      grow
      data-slot="sidebar"
      style={
        {
          "--sidebar-width": APP_SIDEBAR_WIDTH,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "h-full w-(--sidebar-width) justify-between gap-0 p-0",
        className,
      )}
      {...props}
    >
      {children}
    </Island>
  );
};
