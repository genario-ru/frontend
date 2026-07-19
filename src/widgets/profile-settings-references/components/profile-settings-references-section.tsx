import { useCallback, useMemo } from "react";

import type {
  ProfileAttachmentExtendedSchema,
  ProfileChannelVideoSchema,
} from "@/codegen/api/product";
import { ProfileSettingsReferenceCardSkeleton } from "@/features/profile-settings-references/profile-settings-reference-card/components/profile-settings-reference-card-skeleton";
import { IslandSection } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { UploadZone } from "@/shared/components/ui/upload-zone";

import type { ProfileSettingsReferenceSection } from "../types/profile-settings-reference-section";
import { ProfileSettingsReferenceAttachment } from "./profile-settings-reference-attachment";
import { ProfileSettingsReferenceChannelVideo } from "./profile-settings-reference-channel-video";
import { ProfileSettingsReferencesChannelVideoForm } from "./profile-settings-references-channel-video-form";

type ProfileSettingsReferencesSectionProps = {
  section: ProfileSettingsReferenceSection;
  profileId: string;
  attachments: ProfileAttachmentExtendedSchema[];
  channelVideos?: ProfileChannelVideoSchema[];
  isDataLoading?: boolean;
  disabled?: boolean;
  onFilesSelect: (files: File[]) => void;
};

type ProfileSettingsReferencesSectionSkeletonProps = {
  withLinks?: boolean;
};

const profileSettingsReferencesSectionSkeletonCount = 3;

export function ProfileSettingsReferencesSection({
  section,
  profileId,
  attachments,
  channelVideos = [],
  isDataLoading = false,
  disabled = false,
  onFilesSelect,
}: ProfileSettingsReferencesSectionProps) {
  const itemsCount = attachments.length + channelVideos.length;
  const hasItems = itemsCount > 0;

  const handleFilesSelect = useCallback(
    (files: File[]) => {
      onFilesSelect(files);
    },
    [onFilesSelect],
  );

  const referencesSectionContent = useMemo(() => {
    if (isDataLoading) {
      return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: profileSettingsReferencesSectionSkeletonCount,
          }).map((_, index) => (
            <ProfileSettingsReferenceCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (!hasItems) {
      return (
        <UploadZone
          accept={section.accept}
          hint={section.uploadHint}
          disabled={disabled}
          onFilesSelect={handleFilesSelect}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {attachments.map((attachment) => (
          <ProfileSettingsReferenceAttachment
            key={attachment.id}
            profileId={profileId}
            attachment={attachment}
          />
        ))}
        {channelVideos.map((channelVideo) => (
          <ProfileSettingsReferenceChannelVideo
            key={channelVideo.id}
            profileId={profileId}
            channelVideo={channelVideo}
          />
        ))}
        <UploadZone
          accept={section.accept}
          hint={section.uploadHint}
          disabled={disabled}
          onFilesSelect={handleFilesSelect}
        />
      </div>
    );
  }, [
    attachments,
    channelVideos,
    disabled,
    handleFilesSelect,
    hasItems,
    isDataLoading,
    profileId,
    section.accept,
    section.uploadHint,
  ]);

  return (
    <IslandSection title={section.title}>
      {referencesSectionContent}
      {section.withLinks && (
        <ProfileSettingsReferencesChannelVideoForm
          profileId={profileId}
          disabled={disabled}
        />
      )}
    </IslandSection>
  );
}

export function ProfileSettingsReferencesSectionSkeleton({
  withLinks = false,
}: ProfileSettingsReferencesSectionSkeletonProps) {
  return (
    <IslandSection
      title={<TextSkeleton fontSize={18} lineHeight={28} className="w-48" />}
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: profileSettingsReferencesSectionSkeletonCount,
        }).map((_, index) => (
          <ProfileSettingsReferenceCardSkeleton key={index} />
        ))}
      </div>
      <Skeleton className="rounded-4 h-32 w-full" />
      {withLinks && (
        <div className="flex flex-col gap-2 md:flex-row">
          <Skeleton className="rounded-4 h-14 flex-1" />
          <Skeleton className="rounded-4 h-14 w-full md:w-48" />
        </div>
      )}
    </IslandSection>
  );
}
