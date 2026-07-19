import type { ProfileAttachmentExtendedSchema } from "@/codegen/api/product";

import type { ProfileSettingsReferenceSectionKey } from "../types/profile-settings-reference-section";

type ProfileSettingsAttachmentsBySection = Record<
  ProfileSettingsReferenceSectionKey,
  ProfileAttachmentExtendedSchema[]
>;

function createEmptyProfileSettingsAttachmentsBySection(): ProfileSettingsAttachmentsBySection {
  return {
    videoReferences: [],
    actorReferences: [],
    thumbnailReferences: [],
  };
}

export function groupProfileSettingsAttachmentsBySection(
  attachments: ProfileAttachmentExtendedSchema[],
): ProfileSettingsAttachmentsBySection {
  return attachments.reduce((groupedAttachments, attachment) => {
    if (attachment.type === "video-reference") {
      groupedAttachments.videoReferences.push(attachment);
    }

    if (attachment.type === "actor-reference") {
      groupedAttachments.actorReferences.push(attachment);
    }

    if (attachment.type === "thumbnail-reference") {
      groupedAttachments.thumbnailReferences.push(attachment);
    }

    return groupedAttachments;
  }, createEmptyProfileSettingsAttachmentsBySection());
}
