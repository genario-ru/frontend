import { setUser } from "@sentry/react";

export function setSentryUser(userId: string) {
  setUser({ id: userId });
}

export function clearSentryUser() {
  setUser(null);
}
