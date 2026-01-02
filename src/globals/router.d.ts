import type { createRouter } from "@/lib/tanstack-router/create-router";

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
