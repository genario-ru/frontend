import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_without-auth/documents/user-agreement")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <div>Hello /_without-auth/documents/user-agreement!</div>;
}
