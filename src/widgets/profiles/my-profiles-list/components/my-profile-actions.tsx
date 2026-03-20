import { PencilIcon } from "lucide-react";

import { ProfileCardActions } from "@/features/profiles/profile-card/components/profile-card-actions";
import { ProfileCardDeleteProfileDialog } from "@/features/profiles/profile-card/components/profile-card-delete-profile-dialog";
import { ButtonLink } from "@/shared/components/ui/button-link";

import { useMyProfileActions } from "../hooks/use-my-profile-actions";

type MyProfileProps = {
  profileId: string;
  profileName: string;
};

export function MyProfileActions({ profileId, profileName }: MyProfileProps) {
  const {
    handleDeleteProfile,
    isDeleteProfilePending,
    isDeleteProfileDialogOpened,
    setIsDeleteProfileDialogOpened,
  } = useMyProfileActions({
    profileId,
  });

  return (
    <ProfileCardActions
      editAction={
        <ButtonLink
          to="/profiles/settings"
          search={{ profileId }}
          size="sm"
          priority="tertiary"
          rounding="base"
          className="w-full justify-start"
          icon={<PencilIcon />}
        >
          Редактировать
        </ButtonLink>
      }
      deleteAction={
        <ProfileCardDeleteProfileDialog
          profileName={profileName}
          isDialogOpened={isDeleteProfileDialogOpened}
          isDeleteProfilePending={isDeleteProfilePending}
          setIsDialogOpened={setIsDeleteProfileDialogOpened}
          onDeleteProfileButtonClick={handleDeleteProfile}
        />
      }
    />
  );
}
