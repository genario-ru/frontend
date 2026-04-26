import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

import { useCreateProfile } from "@/actions/profiles/hooks/use-create-profile";
import { useUpdateProfile } from "@/actions/profiles/hooks/use-update-profile";
import type { GetApiV1ProfilesByProfileIdQueryResponse } from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";

import { prepareDefaultProfileSettingsFormValues } from "../utils/prepare-profile-settings-form-values";
import {
  profileSettingsFormMatchValidateFn,
  profileSettingsFormValidateFn,
} from "../utils/profile-settings-form-helpers";

type UseProfileSettingsFormParams = {
  profileData: GetApiV1ProfilesByProfileIdQueryResponse | undefined;
};

export function useProfileSettingsForm({
  profileData,
}: UseProfileSettingsFormParams) {
  const router = useRouter();
  const { isScrolledToBottom } = usePageCheckScroll();
  const { createProfile, isCreateProfilePending } = useCreateProfile();
  const { updateProfile, isUpdateProfilePending } = useUpdateProfile();

  const navigateToProfiles = useCallback(() => {
    router.navigate({ to: "/profiles" });
  }, [router]);

  const form = useAppForm({
    defaultValues: prepareDefaultProfileSettingsFormValues({ profileData }),
    validators: {
      onChange: (data) => {
        if (data.formApi.state.submissionAttempts > 0) {
          return profileSettingsFormValidateFn(data);
        }
      },
      onSubmit: profileData
        ? profileSettingsFormMatchValidateFn
        : profileSettingsFormValidateFn,
    },
    onSubmit: ({ value }) => {
      if (profileData) {
        updateProfile(
          { profileId: profileData.data.id, data: value },
          { onSuccess: navigateToProfiles },
        );
      } else {
        createProfile({ data: value }, { onSuccess: navigateToProfiles });
      }
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isLoading: isCreateProfilePending || isUpdateProfilePending,
    isScrolledToBottom,
    isEditMode: Boolean(profileData),
    onFormSubmit,
    onCancelClick: navigateToProfiles,
  };
}
