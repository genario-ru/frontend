import { ProfileCardActions } from "@/features/profiles/profile-card/components/profile-card-actions";
import { ProfileCardDeleteProfileDialog } from "@/features/profiles/profile-card/components/profile-card-delete-profile-dialog";

import { useMyProfileActions } from "../hooks/use-my-profile-actions";
import { MyProfileEditDialog } from "./my-profile-edit-dialog";

type MyProfileProps = {
  id: string;
  name: string;
};

export function MyProfileActions({ id, name }: MyProfileProps) {
  const {
    handleDeleteProfile,
    isDeleteProfilePending,
    isDeleteProfileDialogOpened,
    setIsDeleteProfileDialogOpened,
  } = useMyProfileActions({
    profileId: id,
  });

  return (
    <ProfileCardActions
      editDialog={<MyProfileEditDialog profileId={id} />}
      deleteDialog={
        <ProfileCardDeleteProfileDialog
          profileName={name}
          isDialogOpened={isDeleteProfileDialogOpened}
          isDeleteProfilePending={isDeleteProfilePending}
          setIsDialogOpened={setIsDeleteProfileDialogOpened}
          onDeleteProfileButtonClick={handleDeleteProfile}
        />
      }
    />
  );
}
