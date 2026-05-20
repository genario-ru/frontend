import { Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/widgets/navigation/app-sidebar/components/app-sidebar";

export function WithSubscriptionComponent() {
  return (
    <>
      <aside className="sticky top-0 bottom-0 hidden h-full w-fit flex-col py-8 pl-8 md:flex">
        <AppSidebar />
      </aside>
      <Outlet />
    </>
  );
}
