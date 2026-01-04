import { type ReactNode, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useProfileDialog } from "../hooks/use-profile-dialog";

type ProfileDialogProps = {
  profileId?: string;
  trigger: ReactNode;
  onDialogClose: () => void;
};

export function ProfileDialog({
  profileId,
  trigger,
  onDialogClose,
}: ProfileDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const {
    profileData,
    profileTypesData,
    tonesData,
    platformsData,
    isProfileDialogFormDataLoading,
    isProfileDialogFormDataError,
  } = useProfileDialog({ profileId });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent overlayRef={overlayRef} className="max-w-2xl">
        {isProfileDialogFormDataLoading ? (
          <div>Loading...</div>
        ) : isProfileDialogFormDataError ? (
          <div>Error...</div>
        ) : profileTypesData && tonesData && platformsData ? (
          <>
            <DialogPredefinedHeader
              title={profileData ? "Редактирование профиля" : "Новый профиль"}
              description="Введите всю релевантную информацию о вашем профиле / канале, которая будет полезна при генерации контента"
            />
            {/* <Profile
              profile={profileData}
              profileTypes={profileTypesData}
              tones={tonesData}
              platforms={platformsData}
              overlayRef={overlayRef}
              onDialogClose={onDialogClose}
            /> */}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
