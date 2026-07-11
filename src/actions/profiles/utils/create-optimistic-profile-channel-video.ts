import type { ProfileChannelVideoSchema } from "@/codegen/api/product";

type CreateOptimisticProfileChannelVideoParams = {
  profileId: string;
  optimisticId: string;
  url: string;
};

export function createOptimisticProfileChannelVideo({
  profileId,
  optimisticId,
  url,
}: CreateOptimisticProfileChannelVideoParams): ProfileChannelVideoSchema {
  const now = new Date().toISOString();

  return {
    id: optimisticId,
    profileId,
    platformId: optimisticId,
    profileChannelId: null,
    externalId: null,
    url,
    thumbnailUrl: null,
    name: null,
    description: null,
    likes: null,
    views: null,
    comments: null,
    duration: null,
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
  };
}
