import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { useSessionFromContext } from "@/actions/auth/hooks/use-session-from-context";
import { clearSentryUser, setSentryUser } from "@/lib/sentry";

export function WithAuthComponent() {
  const sessionData = useSessionFromContext();

  useEffect(() => {
    setSentryUser(sessionData.user.id);

    return () => {
      clearSentryUser();
    };
  }, [sessionData.user.id]);

  return <Outlet />;
}
