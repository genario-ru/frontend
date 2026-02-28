import type {
  GetApiV1ProfilesProfileIdQueryResponse,
  GetApiV1ProfilesTypesQueryResponse,
} from "@/codegen/api/product";

import type { ProfileDialogFormValues } from "../types";

type PrepareDefaultProfileFormValuesParams = {
  profileData: GetApiV1ProfilesProfileIdQueryResponse | undefined;
  profileTypesData: GetApiV1ProfilesTypesQueryResponse;
};

export const prepareDefaultProfileFormValues = ({
  profileData,
  profileTypesData,
}: PrepareDefaultProfileFormValuesParams): ProfileDialogFormValues => {
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
    typeId: profileTypesData.data[0]?.id ?? "",
    toneIds: [],
    platformIds: [],
  };
};
