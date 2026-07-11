import type { ProfileSettingsReferenceSectionKey } from "../types/profile-settings-reference-section";

export type ProfileSettingsReferencesCounts = Record<
  ProfileSettingsReferenceSectionKey,
  number
>;

export function createProfileSettingsReferencesCounts(): ProfileSettingsReferencesCounts {
  return {
    videoReferences: 0,
    actorReferences: 0,
    thumbnailReferences: 0,
  };
}
