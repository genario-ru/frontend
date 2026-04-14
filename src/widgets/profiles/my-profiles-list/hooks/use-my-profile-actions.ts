import { useState } from "react";

import { useDeleteProfile } from "@/actions/profiles/hooks/use-delete-profile";

type UseMyProfileActionsParams = {
  profileId: string;
};

export function useMyProfileActions(params: UseMyProfileActionsParams) {
  const { profileId } = params;

  const [isDeleteProfileDialogOpened, setIsDeleteProfileDialogOpened] =
    useState(false);

  const { deleteProfile, isDeleteProfilePending } = useDeleteProfile();

  const handleDeleteProfile = () => {
    deleteProfile(
      { profileId },
      {
        onSuccess: () => {
          setIsDeleteProfileDialogOpened(false);
        },
      },
    );
  };

  return {
    isDeleteProfilePending,
    isDeleteProfileDialogOpened,
    handleDeleteProfile,
    setIsDeleteProfileDialogOpened,
  };
}
