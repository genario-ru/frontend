import { usePostApiV1ProfilesChannelsValidate } from "@/codegen/api/product";

type UseValidateProfileChannelProps = Parameters<
  typeof usePostApiV1ProfilesChannelsValidate
>[0];

export function useValidateProfileChannel(
  options?: UseValidateProfileChannelProps,
) {
  const {
    mutate: validateProfileChannel,
    isPending: isValidateProfileChannelPending,
    isError: isValidateProfileChannelError,
  } = usePostApiV1ProfilesChannelsValidate(options);

  return {
    validateProfileChannel,
    isValidateProfileChannelPending,
    isValidateProfileChannelError,
  };
}
