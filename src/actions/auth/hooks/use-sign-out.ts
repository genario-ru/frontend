import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { postSignOutMutation } from "@/codegen/api/auth/@tanstack/react-query.gen";

export function useSignOut() {
  const navigate = useNavigate();

  const { mutate: signOutMutate } = useMutation({
    ...postSignOutMutation(),
    onSuccess: () => {
      navigate({
        to: "/sign-in",
        reloadDocument: true,
        replace: true,
      });
    },
  });

  const signOut = useCallback(() => {
    signOutMutate({ body: {} });
  }, [signOutMutate]);

  return signOut;
}
