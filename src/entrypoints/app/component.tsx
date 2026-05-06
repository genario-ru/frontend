import { Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/widgets/navigation/app-sidebar/components/app-sidebar";

export function AppComponent() {
  return (
    <>
      <aside className="sticky top-0 bottom-0 hidden h-full w-fit flex-col py-8 pl-8 md:flex">
        <AppSidebar />
      </aside>
      <div className="flex min-h-0 max-w-7xl min-w-0 flex-1 flex-col md:pr-8 md:pl-5">
        <Outlet />
      </div>
    </>
  );
}
