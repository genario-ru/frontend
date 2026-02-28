import type { RefObject } from "react";

import { useCreateProfile } from "@/actions/profiles/hooks/use-create-profile";
import { useUpdateProfile } from "@/actions/profiles/hooks/use-update-profile";
import type {
  GetApiV1ProfilesProfileIdQueryResponse,
  GetApiV1ProfilesTypesQueryResponse,
} from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useCheckScroll } from "@/shared/hooks/use-check-scroll";

import { prepareDefaultProfileFormValues } from "../utils/prepare-profile-dialog-form-values";
import {
  profileDialogFormMatchValidateFn,
  profileDialogFormValidateFn,
} from "../utils/profile-dialog-form-helpers";

type UseProfileDialogFormParams = {
  overlayRef: RefObject<HTMLDivElement | null>;
  profileData: GetApiV1ProfilesProfileIdQueryResponse | undefined;
  profileTypesData: GetApiV1ProfilesTypesQueryResponse;
  onDialogClose: () => void;
};

export function useProfileDialogForm({
  overlayRef,
  profileData,
  profileTypesData,
  onDialogClose,
}: UseProfileDialogFormParams) {
  const { isScrolledToBottom } = useCheckScroll({
    elementRef: overlayRef,
    scrollOffsetBottom: 40,
  });

  const { createProfile, isCreateProfilePending } = useCreateProfile({
    onSuccess: () => {
      onDialogClose();
    },
  });

  const { updateProfile, isUpdateProfilePending } = useUpdateProfile({
    onSuccess: () => {
      onDialogClose();
    },
  });

  const form = useAppForm({
    defaultValues: prepareDefaultProfileFormValues({
      profileData,
      profileTypesData,
    }),
    validators: {
      onSubmit: profileData
        ? profileDialogFormMatchValidateFn
        : profileDialogFormValidateFn,
    },
    onSubmit: ({ value }) => {
      if (profileData) {
        updateProfile({
          profileId: profileData.data.id,
          data: value,
        });
      } else {
        createProfile({ data: value });
      }
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });
  const isLoading = isCreateProfilePending || isUpdateProfilePending;

  return {
    form,
    isLoading,
    isScrolledToBottom,
    onFormSubmit,
  };
}
