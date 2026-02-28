import { usePostEmailOtpSendVerificationOtp } from "@/codegen/api/auth";

type UseSendVerificationOtpParams = Parameters<
  typeof usePostEmailOtpSendVerificationOtp
>[0];

export function useSendVerificationOtp(params?: UseSendVerificationOtpParams) {
  const {
    mutate: sendVerificationOtp,
    isPending: isVerificationOtpSending,
    isSuccess: isVerificationOtpSent,
  } = usePostEmailOtpSendVerificationOtp(params);

  return {
    sendVerificationOtp,
    isVerificationOtpSending,
    isVerificationOtpSent,
  };
}
