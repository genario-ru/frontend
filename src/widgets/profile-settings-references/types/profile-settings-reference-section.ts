export type ProfileSettingsReferenceSectionKey =
  | "videoReferences"
  | "thumbnailReferences"
  | "actorReferences";

export type ProfileSettingsReferenceSection = {
  key: ProfileSettingsReferenceSectionKey;
  title: string;
  accept: string;
  uploadHint: string;
  withLinks: boolean;
  previewVariant: "default" | "video";
  attachmentType: "video-reference" | "actor-reference" | "thumbnail-reference";
};
