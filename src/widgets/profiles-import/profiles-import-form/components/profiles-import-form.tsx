import { useProfilesImportForm } from "../hooks/use-profiles-import-form";
import { ProfilesImportFormButtons } from "./profiles-import-form-buttons";
import { ProfilesImportFormFields } from "./profiles-import-form-fields";

export function ProfilesImportForm() {
  const {
    form,
    successValidationFields,
    activeValidationFields,
    isCreateProfilesFromChannelsPending,
    onFormSubmit,
    handleValidateProfileChannel,
    handleAddProfileChannel,
  } = useProfilesImportForm();

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-2">
      <ProfilesImportFormFields
        form={form}
        successValidationFields={successValidationFields}
        activeValidationFields={activeValidationFields}
        handleValidateProfileChannel={handleValidateProfileChannel}
      />
      <ProfilesImportFormButtons
        form={form}
        isCreateProfilesFromChannelsPending={
          isCreateProfilesFromChannelsPending
        }
        handleAddProfileChannel={handleAddProfileChannel}
      />
    </form>
  );
}
