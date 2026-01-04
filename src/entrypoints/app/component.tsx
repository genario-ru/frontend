import { Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/widgets/navigation/app-sidebar/components/app-sidebar";
import { AppSidebarProvider } from "@/widgets/navigation/app-sidebar/components/app-sidebar-provider";

export function AppComponent() {
  return (
    <AppSidebarProvider defaultOpen={true}>
      <aside className="sticky top-0 bottom-0 flex h-full w-fit flex-col py-8 pl-8">
        <AppSidebar />
      </aside>
      <div className="flex h-full w-full flex-col gap-5 overflow-auto pr-8 pb-8 pl-5">
        <Outlet />
      </div>
    </AppSidebarProvider>
  );
}
