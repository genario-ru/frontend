import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_without-auth/error-test")({
  component: () => (
    <button
      onClick={() => {
        throw new Error("test");
      }}
    >
      Test
    </button>
  ),
});
