import { PencilIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { ProfileDialog } from "../../profile-dialog/components/profile-dialog";

type MyProfileEditDialogProps = {
  profileId: string;
};

export function MyProfileEditDialog({ profileId }: MyProfileEditDialogProps) {
  return (
    <ProfileDialog
      profileId={profileId}
      trigger={
        <Button
          variant="tertiary"
          className="w-full justify-start"
          icon={<PencilIcon />}
        >
          Редактировать
        </Button>
      }
    />
  );
}
