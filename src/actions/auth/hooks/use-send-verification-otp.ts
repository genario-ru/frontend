import { usePostApiV1AuthEmailOtpSendVerificationOtp } from "@/codegen/api/product";

export function useSendVerificationOtp() {
  const {
    mutate: sendVerificationOtp,
    isPending: isVerificationOtpSending,
    isSuccess: isVerificationOtpSent,
  } = usePostApiV1AuthEmailOtpSendVerificationOtp();

  return {
    sendVerificationOtp,
    isVerificationOtpSending,
    isVerificationOtpSent,
  };
}
