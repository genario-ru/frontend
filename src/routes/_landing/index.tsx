import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/_landing/&quot;!</div>;
}
