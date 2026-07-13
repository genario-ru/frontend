import type {
  CreateProfileAttachmentBodySchemaTypeEnumKey,
  ProfileAttachmentExtendedSchema,
} from "@/codegen/api/product";

type CreateOptimisticProfileAttachmentParams = {
  profileId: string;
  optimisticId: string;
  file: Blob;
  fileName: string;
  type: CreateProfileAttachmentBodySchemaTypeEnumKey;
};

type CreateOptimisticProfileAttachmentResult = {
  attachment: ProfileAttachmentExtendedSchema;
  previewObjectUrl?: string;
};

export function createOptimisticProfileAttachment({
  profileId,
  optimisticId,
  file,
  fileName,
  type,
}: CreateOptimisticProfileAttachmentParams): CreateOptimisticProfileAttachmentResult {
  const now = new Date().toISOString();
  const mimeType = file.type || "application/octet-stream";
  const hasLocalPreview =
    mimeType.startsWith("image/") || mimeType.startsWith("video/");
  const previewObjectUrl = hasLocalPreview
    ? URL.createObjectURL(file)
    : undefined;

  const attachmentFile = {
    id: optimisticId,
    userId: optimisticId,
    fileName,
    mimeType,
    createdAt: now,
    updatedAt: now,
    url: previewObjectUrl ?? "",
  };

  if (type === "video-reference") {
    return {
      previewObjectUrl,
      attachment: {
        id: optimisticId,
        type,
        profileId,
        attachmentId: optimisticId,
        summary: null,
        mainTopics: null,
        keyPoints: null,
        tone: null,
        targetAudience: null,
        quotes: null,
        timeline: null,
        wordCount: null,
        segments: null,
        transcript: null,
        createdAt: now,
        updatedAt: now,
        attachment: attachmentFile,
      },
    };
  }

  return {
    previewObjectUrl,
    attachment: {
      id: optimisticId,
      type,
      profileId,
      attachmentId: optimisticId,
      createdAt: now,
      updatedAt: now,
      attachment: attachmentFile,
    },
  };
}
