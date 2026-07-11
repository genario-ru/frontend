import type { ProfileChannelVideoSchema } from "@/codegen/api/product";
import { ProfileSettingsReferenceCard } from "@/features/profile-settings-references/profile-settings-reference-card/components/profile-settings-reference-card";

import { useProfileSettingsReferenceChannelVideo } from "../hooks/use-profile-settings-reference-channel-video";

type ProfileSettingsReferenceChannelVideoProps = {
  profileId: string;
  channelVideo: ProfileChannelVideoSchema;
};

export function ProfileSettingsReferenceChannelVideo({
  profileId,
  channelVideo,
}: ProfileSettingsReferenceChannelVideoProps) {
  const { handleRemove, isPending, isRemoveDisabled } =
    useProfileSettingsReferenceChannelVideo({
      profileId,
      channelVideo,
    });

  return (
    <ProfileSettingsReferenceCard
      fileName={channelVideo.name ?? channelVideo.url}
      mimeType="video/mp4"
      previewUrl={channelVideo.thumbnailUrl}
      externalUrl={channelVideo.url}
      isPending={isPending}
      isRemoveDisabled={isRemoveDisabled}
      onRemove={handleRemove}
    />
  );
}
