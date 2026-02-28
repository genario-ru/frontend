import { usePostSignInEmailOtp } from "@/codegen/api/auth";

type UseSignInEmailOtpParams = Parameters<typeof usePostSignInEmailOtp>[0];

export function useSignInEmailOtp(params: UseSignInEmailOtpParams) {
  return usePostSignInEmailOtp(params);
}
