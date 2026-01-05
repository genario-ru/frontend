import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useProfileDialog } from "../hooks/use-profile-dialog";
import { ProfileDialogForm } from "./profile-dialog-form";

type ProfileDialogProps = {
  profileId?: string;
  trigger: ReactNode;
};

export function ProfileDialog({ profileId, trigger }: ProfileDialogProps) {
  const {
    overlayRef,
    isDialogOpen,
    profileData,
    profileTypesData,
    tonesData,
    platformsData,
    isProfileDialogFormDataLoading,
    isProfileDialogFormDataError,
    setIsDialogOpen,
    onDialogClose,
  } = useProfileDialog({ profileId });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <ProfileDialogForm
              profileData={profileData}
              profileTypesData={profileTypesData}
              tonesData={tonesData}
              platformsData={platformsData}
              overlayRef={overlayRef}
              onDialogClose={onDialogClose}
            />
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
