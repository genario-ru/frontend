import type { GetApiV1ProfilesByProfileIdQueryResponse } from "@/codegen/api/product";

import type { ProfileSettingsFormValues } from "../schemas/profile-settings-form-schema";

type PrepareDefaultProfileSettingsFormValuesParams = {
  profileData: GetApiV1ProfilesByProfileIdQueryResponse | undefined;
};

export const prepareDefaultProfileSettingsFormValues = ({
  profileData,
}: PrepareDefaultProfileSettingsFormValuesParams): ProfileSettingsFormValues => {
  if (profileData) {
    return {
      name: profileData.data.name,
      description: profileData.data.description ?? "",
      targetAudience: profileData.data.targetAudience ?? "",
      typeId: profileData.data.typeId ?? "",
      toneIds: profileData.data.tones.map((tone) => tone.id),
      platformIds: profileData.data.platforms.map((platform) => platform.id),
    };
  }

  return {
    name: "",
    description: "",
    targetAudience: "",
    typeId: "",
    toneIds: [],
    platformIds: [],
  };
};
