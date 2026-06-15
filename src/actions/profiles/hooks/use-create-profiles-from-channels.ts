import { usePostApiV1ProfilesChannels } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useCreateProfilesFromChannels() {
  const reachGoal = useReachGoal();

  const {
    mutate: createProfilesFromChannels,
    isPending: isCreateProfilesFromChannelsPending,
    isError: isCreateProfilesFromChannelsError,
  } = usePostApiV1ProfilesChannels({
    mutation: {
      onSuccess: () => reachGoal("profile-import-start"),
    },
  });

  return {
    createProfilesFromChannels,
    isCreateProfilesFromChannelsPending,
    isCreateProfilesFromChannelsError,
  };
}
