import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { usePostSignOut } from "@/codegen/api/auth";

export function useSignOut() {
  const navigate = useNavigate();

  const { mutate: signOutMutate } = usePostSignOut({
    mutation: {
      onSuccess: () => {
        navigate({
          to: "/sign-in",
          reloadDocument: true,
          replace: true,
        });
      },
    },
  });

  const signOut = useCallback(() => {
    signOutMutate({ data: {} });
  }, [signOutMutate]);

  return signOut;
}
