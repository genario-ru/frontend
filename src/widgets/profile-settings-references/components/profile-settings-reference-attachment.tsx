import type { ProfileAttachmentExtendedSchema } from "@/codegen/api/product";
import { ProfileSettingsReferenceCard } from "@/features/profile-settings-references/profile-settings-reference-card/components/profile-settings-reference-card";

import { useProfileSettingsReferenceAttachment } from "../hooks/use-profile-settings-reference-attachment";

type ProfileSettingsReferenceAttachmentProps = {
  profileId: string;
  attachment: ProfileAttachmentExtendedSchema;
};

export function ProfileSettingsReferenceAttachment({
  profileId,
  attachment,
}: ProfileSettingsReferenceAttachmentProps) {
  const { handleRemove, isPending, isRemoveDisabled } =
    useProfileSettingsReferenceAttachment({
      profileId,
      attachment,
    });

  return (
    <ProfileSettingsReferenceCard
      fileName={attachment.attachment.fileName}
      mimeType={attachment.attachment.mimeType}
      previewUrl={attachment.attachment.url}
      isPending={isPending}
      isRemoveDisabled={isRemoveDisabled}
      onRemove={handleRemove}
    />
  );
}
