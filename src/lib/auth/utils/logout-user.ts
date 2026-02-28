import { redirect } from "@tanstack/react-router";

type SignOutUserParams = {
  redirect?: string;
};

export function signOutUser({ redirect: redirectParam }: SignOutUserParams) {
  throw redirect({
    replace: true,
    reloadDocument: true,
    to: "/sign-in",
    search: {
      redirect: redirectParam,
    },
  });
}
