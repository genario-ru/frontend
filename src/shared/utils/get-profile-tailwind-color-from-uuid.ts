import { profileTailwindColors } from "../constants/profile-tailwind-colors";
import { uuidToNumber } from "./uuid-to-number";

export const getProfileTailwindColorFromUuid = (uuid?: string | null) => {
  const numberFromProfileId = uuid
    ? uuidToNumber(uuid, profileTailwindColors.length)
    : 0;
  const profileColor = profileTailwindColors[numberFromProfileId];

  return profileColor;
};
