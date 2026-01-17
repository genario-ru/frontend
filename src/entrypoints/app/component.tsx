import { Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/widgets/navigation/app-sidebar/components/app-sidebar";
import { AppSidebarProvider } from "@/widgets/navigation/app-sidebar/components/app-sidebar-provider";

export function AppComponent() {
  return (
    <AppSidebarProvider defaultOpen={true}>
      <aside className="sticky top-0 bottom-0 flex h-full w-fit flex-col py-8 pl-8">
        <AppSidebar />
      </aside>
      <div className="flex w-full max-w-7xl flex-col pr-8 pl-5">
        <Outlet />
      </div>
    </AppSidebarProvider>
  );
}
