import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { useCreateProfile } from "@/actions/profiles/hooks/use-create-profile";
import { useUpdateProfile } from "@/actions/profiles/hooks/use-update-profile";
import type { GetApiV1ProfilesByProfileIdQueryResponse } from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import type { ProfileSettingsGeneralFormValues } from "../schemas/profile-settings-general-form-schema";
import {
  prepareCreateProfileSettingsGeneralSubmitData,
  prepareUpdateProfileSettingsGeneralSubmitData,
} from "../utils/prepare-profile-settings-general-form-submit-data";
import { prepareProfileSettingsGeneralFormValues } from "../utils/prepare-profile-settings-general-form-values";
import {
  profileSettingsGeneralFormOnChangeValidateFn,
  profileSettingsGeneralFormValidateFn,
} from "../utils/profile-settings-general-form-helpers";

type UseProfileSettingsGeneralFormParams = {
  profileData: GetApiV1ProfilesByProfileIdQueryResponse | undefined;
};

export function useProfileSettingsGeneralForm({
  profileData,
}: UseProfileSettingsGeneralFormParams) {
  const navigate = useNavigate();
  const { createProfile, isCreateProfilePending } = useCreateProfile();
  const { updateProfile, isUpdateProfilePending } = useUpdateProfile();

  const handleCancelClick = useCallback(() => {
    navigate({ to: "/profiles" });
  }, [navigate]);

  const handleUpdateProfileSuccess = useCallback(() => {
    if (!profileData) {
      return;
    }

    navigate({
      to: "/profiles/settings",
      search: {
        profileId: profileData.data.id,
      },
      replace: true,
    });
  }, [navigate, profileData]);

  const handleCreateProfileSuccess = useCallback(
    ({ data }: { data: { id: string } }) => {
      navigate({
        to: "/profiles/settings/references",
        search: {
          profileId: data.id,
        },
        replace: true,
      });
    },
    [navigate],
  );

  const handleSubmit = useCallback(
    ({ value }: { value: ProfileSettingsGeneralFormValues }) => {
      if (profileData) {
        updateProfile(
          {
            profileId: profileData.data.id,
            data: prepareUpdateProfileSettingsGeneralSubmitData({ value }),
          },
          { onSuccess: handleUpdateProfileSuccess },
        );

        return;
      }

      createProfile(
        { data: prepareCreateProfileSettingsGeneralSubmitData({ value }) },
        { onSuccess: handleCreateProfileSuccess },
      );
    },
    [
      createProfile,
      handleCreateProfileSuccess,
      handleUpdateProfileSuccess,
      profileData,
      updateProfile,
    ],
  );

  const form = useAppForm({
    defaultValues: prepareProfileSettingsGeneralFormValues({ profileData }),
    validators: {
      onChange: profileSettingsGeneralFormOnChangeValidateFn,
      onSubmit: profileSettingsGeneralFormValidateFn,
    },
    onSubmit: handleSubmit,
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isLoading: isCreateProfilePending || isUpdateProfilePending,
    onFormSubmit,
    onCancelClick: handleCancelClick,
  };
}
