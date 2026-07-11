import type {
  GetApiV1ProfilesByProfileIdQueryResponse,
  GetPlatformsResponseSchema,
  GetProfileTypesResponseSchema,
} from "@/codegen/api/product";
import { Island } from "@/shared/components/ui/island";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { useProfileSettingsGeneralForm } from "../hooks/use-profile-settings-general-form";
import {
  ProfileSettingsFormActions,
  ProfileSettingsFormActionsSkeleton,
} from "./profile-settings-form-actions";
import {
  ProfileSettingsGeneralFormFields,
  ProfileSettingsGeneralFormFieldsSkeleton,
} from "./profile-settings-general-form-fields";
import { ProfileSettingsSidebarGeneral } from "./profile-settings-sidebar-general";

const PROFILE_SETTINGS_GENERAL_FORM_ID = "profile-settings-general-form";

type ProfileSettingsGeneralFormProps = {
  profileData: GetApiV1ProfilesByProfileIdQueryResponse | undefined;
  profileTypesData: GetProfileTypesResponseSchema;
  platformsData: GetPlatformsResponseSchema;
};

export function ProfileSettingsGeneralForm({
  profileData,
  profileTypesData,
  platformsData,
}: ProfileSettingsGeneralFormProps) {
  const { isDesktop } = useBreakpoints();
  const { form, isLoading, onFormSubmit, onCancelClick } =
    useProfileSettingsGeneralForm({ profileData });

  return (
    <>
      <section className="flex min-w-0 flex-col gap-2">
        <form
          id={PROFILE_SETTINGS_GENERAL_FORM_ID}
          onSubmit={onFormSubmit}
          className="flex min-w-0 flex-1 flex-col"
        >
          <Island className="flex-1 gap-6">
            <ProfileSettingsGeneralFormFields
              form={form}
              profileTypesData={profileTypesData}
              platformsData={platformsData}
            />
          </Island>
        </form>
        <ProfileSettingsFormActions
          formId={PROFILE_SETTINGS_GENERAL_FORM_ID}
          isLoading={isLoading}
          onCancelClick={onCancelClick}
        />
      </section>
      {isDesktop && <ProfileSettingsSidebarGeneral />}
    </>
  );
}

export function ProfileSettingsGeneralFormSkeleton() {
  return (
    <section className="flex min-w-0 flex-col gap-2">
      <Island className="flex-1 gap-6">
        <ProfileSettingsGeneralFormFieldsSkeleton />
      </Island>
      <ProfileSettingsFormActionsSkeleton />
    </section>
  );
}
