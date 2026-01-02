import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { postSignInEmailOtpMutation } from "@/codegen/api/auth/@tanstack/react-query.gen";
import type { Options } from "@/codegen/api/auth/client";
import type {
  PostSignInEmailOtpData,
  PostSignInEmailOtpError,
  PostSignInEmailOtpResponse,
} from "@/codegen/api/auth/types.gen";

type UseSignInEmailOtpParams = UseMutationOptions<
  PostSignInEmailOtpResponse,
  PostSignInEmailOtpError,
  Options<PostSignInEmailOtpData>
>;

export function useSignInEmailOtp(params: UseSignInEmailOtpParams) {
  return useMutation({
    ...postSignInEmailOtpMutation(),
    ...params,
  });
}
