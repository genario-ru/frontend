import { z } from "@/lib/zod";

export const apiErrorCauseSchema = z.object({
  url: z.string(),
  status: z.number(),
  statusText: z.string(),
  data: z.unknown(),
});

export type APIErrorCause<TError = unknown> = z.infer<
  typeof apiErrorCauseSchema
> & {
  data: TError;
};
