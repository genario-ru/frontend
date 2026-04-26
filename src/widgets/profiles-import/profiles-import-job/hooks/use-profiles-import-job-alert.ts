import { useMemo } from "react";

import { useGetMyProfilesFromChannelsJobs } from "@/actions/profiles/hooks/use-get-my-profiles-from-channels-jobs";

export function useProfilesImportJobAlert() {
  const { myProfilesFromChannelsActiveJobs } =
    useGetMyProfilesFromChannelsJobs();

  const hasActiveProfilesFromChannelsJob = useMemo(() => {
    return Boolean(myProfilesFromChannelsActiveJobs?.length);
  }, [myProfilesFromChannelsActiveJobs]);

  return { hasActiveProfilesFromChannelsJob };
}
