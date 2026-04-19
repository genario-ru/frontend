import { useRouteContext } from "@tanstack/react-router";

export function useSessionFromContext() {
  const { sessionData } = useRouteContext({
    from: "/_with-auth",
  });

  return sessionData;
}
