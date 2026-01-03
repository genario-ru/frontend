import { redirect } from "@tanstack/react-router";

type LogoutUserParams = {
  redirectTo?: string;
};

export function logoutUser({ redirectTo }: LogoutUserParams) {
  throw redirect({
    replace: true,
    reloadDocument: true,
    to: "/sign-in",
    search: {
      redirect: redirectTo,
      signOut: true,
    },
    mask: {
      to: "/sign-in",
    },
  });
}
