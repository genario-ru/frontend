import { useCallback } from "react";

import { useCreateProfileChannelVideo } from "@/actions/profiles/hooks/use-create-profile-channel-video";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import type { ProfileSettingsReferencesChannelVideoFormValues } from "../schemas/profile-settings-references-channel-video-form-schema";
import { profileSettingsReferencesChannelVideoFormValidateFn } from "../utils/profile-settings-references-channel-video-form-helpers";

type UseProfileSettingsReferencesChannelVideoFormParams = {
  profileId: string;
  disabled?: boolean;
};

const profileSettingsReferencesChannelVideoFormDefaultValues: ProfileSettingsReferencesChannelVideoFormValues =
  {
    url: "",
  };

export function useProfileSettingsReferencesChannelVideoForm({
  profileId,
  disabled = false,
}: UseProfileSettingsReferencesChannelVideoFormParams) {
  const form = useAppForm({
    defaultValues: profileSettingsReferencesChannelVideoFormDefaultValues,
    validators: {
      onSubmit: profileSettingsReferencesChannelVideoFormValidateFn,
    },
    onSubmit: async ({ value }) => {
      createProfileChannelVideo({
        profileId,
        data: {
          url: value.url,
        },
      });
    },
  });

  const { createProfileChannelVideo, isCreateProfileChannelVideoPending } =
    useCreateProfileChannelVideo({
      profileId,
      mutationOptions: {
        onSuccess: () => {
          form.reset();
        },
      },
    });

  const { onFormSubmit } = useFormHandlers({ form });

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onFormSubmit(event);
    },
    [disabled, onFormSubmit],
  );

  return {
    form,
    isSubmitting: isCreateProfileChannelVideoPending,
    onFormSubmit: handleFormSubmit,
  };
}
