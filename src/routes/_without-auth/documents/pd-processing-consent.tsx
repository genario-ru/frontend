import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_without-auth/documents/pd-processing-consent",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /_without-auth/documents/pd-processing-consent!</div>;
}
