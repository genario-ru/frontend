import { usePostApiV1AuthEmailOtpSendVerificationOtp } from "@/codegen/api/product";

type UseSendVerificationOtpParams = Parameters<
  typeof usePostApiV1AuthEmailOtpSendVerificationOtp
>[0];

export function useSendVerificationOtp(params?: UseSendVerificationOtpParams) {
  const {
    mutate: sendVerificationOtp,
    isPending: isVerificationOtpSending,
    isSuccess: isVerificationOtpSent,
  } = usePostApiV1AuthEmailOtpSendVerificationOtp(params);

  return {
    sendVerificationOtp,
    isVerificationOtpSending,
    isVerificationOtpSent,
  };
}
