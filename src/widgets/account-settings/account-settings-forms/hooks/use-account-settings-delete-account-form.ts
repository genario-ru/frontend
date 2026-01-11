import { useCallback } from "react";

import { useDeleteUser } from "@/actions/auth/hooks/use-delete-user";
import { composeFullUrl } from "@/shared/utils/compose-full-url";

export function useAccountSettingsDeleteAccountForm() {
  const { deleteUser, isDeleteUserPending } = useDeleteUser();

  const onConfirmDeleteAccountButtonClick = useCallback(() => {
    const callbackURL = composeFullUrl("/sign-in");

    deleteUser({
      body: {
        callbackURL,
      },
    });
  }, [deleteUser]);

  return {
    isDeleteUserPending,
    onConfirmDeleteAccountButtonClick,
  };
}
