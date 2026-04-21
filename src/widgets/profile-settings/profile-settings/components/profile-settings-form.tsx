import type {
  GetApiV1PlatformsQueryResponse,
  GetApiV1ProfilesByProfileIdQueryResponse,
  GetApiV1ProfilesTypesQueryResponse,
  GetApiV1TonesQueryResponse,
} from "@/codegen/api/product";
import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useProfileSettingsForm } from "../hooks/use-profile-settings-form";
import {
  ProfileSettingsFormButtons,
  ProfileSettingsFormButtonsSkeleton,
} from "./profile-settings-form-buttons";
import { ProfileSettingsFormFields } from "./profile-settings-form-fields";

const PROFILE_SETTINGS_FORM_ID = "profile-settings-form";

type ProfileSettingsFormProps = {
  profileData: GetApiV1ProfilesByProfileIdQueryResponse | undefined;
  profileTypesData: GetApiV1ProfilesTypesQueryResponse;
  tonesData: GetApiV1TonesQueryResponse;
  platformsData: GetApiV1PlatformsQueryResponse;
};

export function ProfileSettingsForm({
  profileData,
  profileTypesData,
  tonesData,
  platformsData,
}: ProfileSettingsFormProps) {
  const {
    form,
    isLoading,
    isScrolledToBottom,
    isEditMode,
    onFormSubmit,
    onCancelClick,
  } = useProfileSettingsForm({ profileData });

  return (
    <>
      <form
        id={PROFILE_SETTINGS_FORM_ID}
        onSubmit={onFormSubmit}
        className="flex w-full flex-1 flex-col"
      >
        <ProfileSettingsFormFields
          form={form}
          profileTypesData={profileTypesData}
          tonesData={tonesData}
          platformsData={platformsData}
        />
      </form>
      <ProfileSettingsFormButtons
        form={form}
        formId={PROFILE_SETTINGS_FORM_ID}
        isEditMode={isEditMode}
        isLoading={isLoading}
        isScrolledToBottom={isScrolledToBottom}
        onCancelClick={onCancelClick}
      />
    </>
  );
}

export function ProfileSettingsFormSkeleton() {
  return (
    <>
      <Island className="flex-1">
        <ItemsList
          count={6}
          gap={24}
          item={
            <div className="flex w-full flex-col gap-2">
              <TextSkeleton fontSize={16} lineHeight={24} className="w-40" />
              <Skeleton className="rounded-4 h-14 w-full" />
            </div>
          }
          className="w-full"
        />
      </Island>
      <ProfileSettingsFormButtonsSkeleton />
    </>
  );
}

export function ProfileSettingsFormErrorPlug() {
  return (
    <Island className="flex-1" roundedBottom={false}>
      <Plug
        variant="negative"
        className="flex-1"
        title="Ошибка загрузки"
        description="Произошла ошибка при загрузке формы. Попробуйте обновить страницу"
      />
    </Island>
  );
}

export function ProfileSettingsFormNotEnoughDataPlug() {
  return (
    <Island className="flex-1" roundedBottom={false}>
      <Plug
        variant="negative"
        className="flex-1"
        title="Недостаточно данных"
        description="Недостаточно данных для отображения формы"
      />
    </Island>
  );
}
