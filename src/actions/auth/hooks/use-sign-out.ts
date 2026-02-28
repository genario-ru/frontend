import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

import { postSignOutMutation } from "@/codegen/api/auth/@tanstack/react-query.gen";

export const useSignOut = () => {
  const router = useRouter();

  const { mutate: signOutMutate } = useMutation({
    ...postSignOutMutation(),
    onSuccess: () => {
      router.navigate({
        to: "/sign-in",
        reloadDocument: true,
        replace: true,
        search: {
          redirect: router.state.location.pathname,
        },
      });
    },
  });

  const signOut = useCallback(() => {
    signOutMutate({ body: {} });
  }, [signOutMutate]);

  return signOut;
};
