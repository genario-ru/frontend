import { usePostApiV1ProfilesChannelsValidate } from "@/codegen/api/product";

export function useValidateProfileChannel() {
  const {
    mutate: validateProfileChannel,
    isPending: isValidateProfileChannelPending,
    isError: isValidateProfileChannelError,
  } = usePostApiV1ProfilesChannelsValidate();

  return {
    validateProfileChannel,
    isValidateProfileChannelPending,
    isValidateProfileChannelError,
  };
}
