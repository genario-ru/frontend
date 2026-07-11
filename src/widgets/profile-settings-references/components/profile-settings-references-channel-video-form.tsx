import { Link2Icon } from "lucide-react";

import { profileSettingsReferenceLinksPlaceholder } from "../constants/profile-settings-references-channel-video-form";
import { useProfileSettingsReferencesChannelVideoForm } from "../hooks/use-profile-settings-references-channel-video-form";

type ProfileSettingsReferencesChannelVideoFormProps = {
  profileId: string;
  disabled?: boolean;
};

export function ProfileSettingsReferencesChannelVideoForm({
  profileId,
  disabled = false,
}: ProfileSettingsReferencesChannelVideoFormProps) {
  const { form, isSubmitting, onFormSubmit } =
    useProfileSettingsReferencesChannelVideoForm({
      profileId,
      disabled,
    });

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-2 md:flex-row">
      <form.AppField name="url">
        {(field) => (
          <field.InputField
            size="lg"
            disabled={disabled || isSubmitting}
            placeholder={profileSettingsReferenceLinksPlaceholder}
          />
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton
          size="lg"
          disabled={disabled}
          state={isSubmitting ? "loading" : "default"}
          icon={<Link2Icon />}
          className="md:w-auto"
        >
          Добавить ссылку
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
