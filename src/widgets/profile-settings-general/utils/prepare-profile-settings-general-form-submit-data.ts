import type {
  CreateProfileBodySchema,
  UpdateProfileBodySchema,
} from "@/codegen/api/product";

import type { ProfileSettingsGeneralFormValues } from "../schemas/profile-settings-general-form-schema";
import {
  normalizeProfileSettingsOptionalStringForCreate,
  normalizeProfileSettingsOptionalStringForUpdate,
} from "./profile-settings-general-form-helpers";

type PrepareProfileSettingsGeneralSubmitDataParams = {
  value: ProfileSettingsGeneralFormValues;
};

type CommonProfileSettingsGeneralSubmitData = {
  name: string;
  typeId: string;
  platformIds: string[];
};

function prepareCommonProfileSettingsGeneralSubmitData({
  value,
}: PrepareProfileSettingsGeneralSubmitDataParams): CommonProfileSettingsGeneralSubmitData {
  return {
    name: value.name.trim(),
    typeId: value.typeId,
    platformIds: value.platformIds,
  };
}

export function prepareCreateProfileSettingsGeneralSubmitData({
  value,
}: PrepareProfileSettingsGeneralSubmitDataParams): CreateProfileBodySchema {
  const commonData = prepareCommonProfileSettingsGeneralSubmitData({ value });
  let normalizedPlatformIds: string[] | undefined = undefined;

  if (commonData.platformIds.length > 0) {
    normalizedPlatformIds = commonData.platformIds;
  }

  return {
    ...commonData,
    platformIds: normalizedPlatformIds,
    positioning: normalizeProfileSettingsOptionalStringForCreate(
      value.positioning,
    ),
    targetAudience: normalizeProfileSettingsOptionalStringForCreate(
      value.targetAudience,
    ),
    additionalInfo: normalizeProfileSettingsOptionalStringForCreate(
      value.additionalInfo,
    ),
  };
}

export function prepareUpdateProfileSettingsGeneralSubmitData({
  value,
}: PrepareProfileSettingsGeneralSubmitDataParams): UpdateProfileBodySchema {
  const commonData = prepareCommonProfileSettingsGeneralSubmitData({ value });

  return {
    ...commonData,
    positioning: normalizeProfileSettingsOptionalStringForUpdate(
      value.positioning,
    ),
    targetAudience: normalizeProfileSettingsOptionalStringForUpdate(
      value.targetAudience,
    ),
    additionalInfo: normalizeProfileSettingsOptionalStringForUpdate(
      value.additionalInfo,
    ),
  };
}
