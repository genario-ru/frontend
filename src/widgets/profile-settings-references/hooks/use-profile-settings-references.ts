import { useCallback, useMemo } from "react";

import { useCreateProfileAttachment } from "@/actions/profiles/hooks/use-create-profile-attachment";
import { useGetProfileAttachments } from "@/actions/profiles/hooks/use-get-profile-attachments";
import { useGetProfileChannelVideos } from "@/actions/profiles/hooks/use-get-profile-channel-videos";

import {
  profileSettingsReferenceSectionAttachmentTypeByKey,
  profileSettingsReferenceSections,
} from "../constants/profile-settings-reference-sections";
import type { ProfileSettingsReferenceSectionKey } from "../types/profile-settings-reference-section";
import { createProfileSettingsReferencesCounts } from "../types/profile-settings-references-counts";
import { groupProfileSettingsAttachmentsBySection } from "../utils/group-profile-settings-attachments-by-section";

type UseProfileSettingsReferencesParams = {
  profileId: string;
};

export function useProfileSettingsReferences({
  profileId,
}: UseProfileSettingsReferencesParams) {
  const {
    profileAttachmentsData,
    isProfileAttachmentsLoading,
    isProfileAttachmentsError,
  } = useGetProfileAttachments({ profileId });

  const {
    profileChannelVideosData,
    isProfileChannelVideosLoading,
    isProfileChannelVideosError,
  } = useGetProfileChannelVideos({ profileId });

  const { createProfileAttachment } = useCreateProfileAttachment({ profileId });

  const uploadFiles = useCallback(
    (sectionKey: ProfileSettingsReferenceSectionKey) => (files: File[]) => {
      if (!files.length) {
        return;
      }

      const attachmentType =
        profileSettingsReferenceSectionAttachmentTypeByKey[sectionKey];

      files.forEach((file) => {
        createProfileAttachment({
          profileId,
          data: {
            file,
            type: attachmentType,
          },
        });
      });
    },
    [createProfileAttachment, profileId],
  );

  const uploadFilesHandlers = useMemo(
    () => ({
      videoReferences: uploadFiles("videoReferences"),
      actorReferences: uploadFiles("actorReferences"),
      thumbnailReferences: uploadFiles("thumbnailReferences"),
    }),
    [uploadFiles],
  );

  const attachmentsBySection = useMemo(() => {
    return groupProfileSettingsAttachmentsBySection(
      profileAttachmentsData?.data ?? [],
    );
  }, [profileAttachmentsData]);

  const channelVideos = useMemo(() => {
    return profileChannelVideosData?.data ?? [];
  }, [profileChannelVideosData]);

  const referencesCounts = useMemo(() => {
    const counts = createProfileSettingsReferencesCounts();

    counts.videoReferences =
      attachmentsBySection.videoReferences.length + channelVideos.length;
    counts.actorReferences = attachmentsBySection.actorReferences.length;
    counts.thumbnailReferences =
      attachmentsBySection.thumbnailReferences.length;

    return counts;
  }, [attachmentsBySection, channelVideos.length]);

  const isDataLoading =
    isProfileAttachmentsLoading || isProfileChannelVideosLoading;

  return {
    referenceSections: profileSettingsReferenceSections,
    attachmentsBySection,
    channelVideos,
    referencesCounts,
    uploadFilesHandlers,
    isDataLoading,
    isError: isProfileAttachmentsError || isProfileChannelVideosError,
  };
}
