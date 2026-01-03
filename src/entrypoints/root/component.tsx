import { TanstackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Toaster } from "@/shared/components/ui/toaster";

export function RootComponent() {
  return (
    <>
      <HeadContent />
      <Scripts />
      <div className="bg-neutral-2 relative isolate flex h-full min-h-dvh w-full">
        <Outlet />
      </div>
      <Toaster />
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "React Query",
            render: <ReactQueryDevtools />,
          },
        ]}
      />
    </>
  );
}
