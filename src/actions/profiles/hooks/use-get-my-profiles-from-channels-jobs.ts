import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {
  getApiV1ProfilesMyQueryKey,
  useGetApiV1ProfilesChannelsJobsMy,
} from "@/codegen/api/product";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

const REFRESH_INTERVAL = 3000;

export function useGetMyProfilesFromChannelsJobs() {
  const queryClient = useQueryClient();
  const [shouldRefetchProfiles, setShouldRefetchProfiles] = useState(false);

  const {
    data: myProfilesFromChannelsActiveJobs = [],
    isLoading: isMyProfilesFromChannelsJobsLoading,
    isError: isMyProfilesFromChannelsJobsError,
  } = useGetApiV1ProfilesChannelsJobsMy({
    query: {
      refetchInterval: ({ state }) => {
        const hasActiveGenerationJobs = state.data?.data.some((job) =>
          checkIsGenerationStatus(job.status),
        );

        if (hasActiveGenerationJobs) {
          return REFRESH_INTERVAL;
        }

        return false;
      },
      select: (data) =>
        data.data.filter((job) => checkIsGenerationStatus(job.status)),
    },
  });

  const hasActiveGenerationJobs = useMemo(() => {
    return myProfilesFromChannelsActiveJobs.length > 0;
  }, [myProfilesFromChannelsActiveJobs]);

  useEffect(() => {
    if (hasActiveGenerationJobs && !shouldRefetchProfiles) {
      setShouldRefetchProfiles(true);
      return;
    }

    if (!hasActiveGenerationJobs && shouldRefetchProfiles) {
      queryClient.invalidateQueries({
        queryKey: getApiV1ProfilesMyQueryKey(),
      });

      setShouldRefetchProfiles(false);
    }
  }, [queryClient, hasActiveGenerationJobs, shouldRefetchProfiles]);

  return {
    myProfilesFromChannelsActiveJobs,
    isMyProfilesFromChannelsJobsLoading,
    isMyProfilesFromChannelsJobsError,
  };
}
