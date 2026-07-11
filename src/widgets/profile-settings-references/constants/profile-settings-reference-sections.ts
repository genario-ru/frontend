import type { CreateProfileAttachmentBodySchemaTypeEnumKey } from "@/codegen/api/product";

import type {
  ProfileSettingsReferenceSection,
  ProfileSettingsReferenceSectionKey,
} from "../types/profile-settings-reference-section";

export const profileSettingsReferenceSections: ProfileSettingsReferenceSection[] =
  [
    {
      key: "videoReferences",
      title: "Референсы видео",
      accept: ".mp4,.webm,.mov",
      uploadHint: "MP4, WEBM и MOV",
      withLinks: true,
      previewVariant: "video",
      attachmentType: "video-reference",
    },
    {
      key: "actorReferences",
      title: "Портреты",
      accept: ".png,.jpg,.jpeg,.heic,.webp",
      uploadHint: "PNG, JPG, JPEG, HEIC и WEBP",
      withLinks: false,
      previewVariant: "default",
      attachmentType: "actor-reference",
    },
    {
      key: "thumbnailReferences",
      title: "Обложки",
      accept: ".png,.jpg,.jpeg,.heic,.webp",
      uploadHint: "PNG, JPG, JPEG, HEIC и WEBP",
      withLinks: false,
      previewVariant: "default",
      attachmentType: "thumbnail-reference",
    },
  ];

export const profileSettingsReferenceSectionAttachmentTypeByKey: Record<
  ProfileSettingsReferenceSectionKey,
  CreateProfileAttachmentBodySchemaTypeEnumKey
> = {
  videoReferences: "video-reference",
  actorReferences: "actor-reference",
  thumbnailReferences: "thumbnail-reference",
};
