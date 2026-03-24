import { usePostApiV1ProfilesChannels } from "@/codegen/api/product";

export function useCreateProfilesFromChannels() {
  const {
    mutate: createProfilesFromChannels,
    isPending: isCreateProfilesFromChannelsPending,
    isError: isCreateProfilesFromChannelsError,
  } = usePostApiV1ProfilesChannels();

  return {
    createProfilesFromChannels,
    isCreateProfilesFromChannelsPending,
    isCreateProfilesFromChannelsError,
  };
}
