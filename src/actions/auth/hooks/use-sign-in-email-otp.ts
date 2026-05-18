import { usePostApiV1AuthEmailOtpSignIn } from "@/codegen/api/product";

type UseSignInEmailOtpParams = Parameters<
  typeof usePostApiV1AuthEmailOtpSignIn
>[0];

export function useSignInEmailOtp(params: UseSignInEmailOtpParams) {
  return usePostApiV1AuthEmailOtpSignIn(params);
}
