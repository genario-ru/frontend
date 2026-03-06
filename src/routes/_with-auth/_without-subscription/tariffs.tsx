import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_with-auth/_without-subscription/tariffs",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /_app/tariffs</div>;
}
