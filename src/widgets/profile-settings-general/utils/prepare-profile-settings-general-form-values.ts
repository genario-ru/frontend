import type { GetApiV1ProfilesByProfileIdQueryResponse } from "@/codegen/api/product";

import type { ProfileSettingsGeneralFormValues } from "../schemas/profile-settings-general-form-schema";

type PrepareProfileSettingsGeneralFormValuesParams = {
  profileData: GetApiV1ProfilesByProfileIdQueryResponse | undefined;
};

export function prepareProfileSettingsGeneralFormValues({
  profileData,
}: PrepareProfileSettingsGeneralFormValuesParams): ProfileSettingsGeneralFormValues {
  if (!profileData) {
    return {
      name: "",
      typeId: "",
      platformIds: [],
      positioning: "",
      targetAudience: "",
      additionalInfo: "",
    };
  }

  return {
    name: profileData.data.name,
    typeId: profileData.data.typeId ?? "",
    platformIds: profileData.data.platforms.map((platform) => platform.id),
    positioning: profileData.data.positioning ?? "",
    targetAudience: profileData.data.targetAudience ?? "",
    additionalInfo: profileData.data.additionalInfo ?? "",
  };
}
