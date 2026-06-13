import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { usePostApiV1AuthSignOut } from "@/codegen/api/product";

export function useSignOut() {
  const navigate = useNavigate();

  const { mutate: signOutMutate } = usePostApiV1AuthSignOut({
    mutation: {
      onSuccess: () => {
        navigate({
          to: "/",
          reloadDocument: true,
          replace: true,
        });
      },
    },
  });

  const signOut = useCallback(() => {
    signOutMutate();
  }, [signOutMutate]);

  return signOut;
}
