import { useProfilesImportForm } from "../hooks/use-profiles-import-form";
import { ProfilesImportFormButtons } from "./profiles-import-form-buttons";
import { ProfilesImportFormFields } from "./profiles-import-form-fields";

export function ProfilesImportForm() {
  const {
    form,
    successValidationFields,
    onFormSubmit,
    handleValidateProfileChannel,
    handleAddProfileChannel,
  } = useProfilesImportForm();

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-4">
      <ProfilesImportFormFields
        form={form}
        successValidationFields={successValidationFields}
        handleValidateProfileChannel={handleValidateProfileChannel}
      />
      <ProfilesImportFormButtons
        form={form}
        handleAddProfileChannel={handleAddProfileChannel}
      />
    </form>
  );
}
