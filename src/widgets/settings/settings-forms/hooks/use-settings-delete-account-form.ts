import { useCallback } from "react";

import { useDeleteUser } from "@/actions/auth/hooks/use-delete-user";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { composeFullUrl } from "@/shared/utils/compose-full-url";

export function useSettingsDeleteAccountForm() {
  const { isMobile } = useBreakpoints();
  const { deleteUser, isDeleteUserPending } = useDeleteUser();

  const onConfirmDeleteAccountButtonClick = useCallback(() => {
    const callbackURL = composeFullUrl("/sign-in");

    deleteUser({
      data: {
        callbackURL,
      },
    });
  }, [deleteUser]);

  return {
    isMobile,
    isDeleteUserPending,
    onConfirmDeleteAccountButtonClick,
  };
}
