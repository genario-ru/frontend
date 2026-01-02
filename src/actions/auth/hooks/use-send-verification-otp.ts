import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { postEmailOtpSendVerificationOtpMutation } from "@/codegen/api/auth/@tanstack/react-query.gen";
import type { Options } from "@/codegen/api/auth/client";
import type {
  PostEmailOtpSendVerificationOtpData,
  PostEmailOtpSendVerificationOtpError,
  PostEmailOtpSendVerificationOtpResponse,
} from "@/codegen/api/auth/types.gen";

type UseSendVerificationOtpParams = UseMutationOptions<
  PostEmailOtpSendVerificationOtpResponse,
  PostEmailOtpSendVerificationOtpError,
  Options<PostEmailOtpSendVerificationOtpData>
>;

export function useSendVerificationOtp(params: UseSendVerificationOtpParams) {
  return useMutation({
    ...postEmailOtpSendVerificationOtpMutation(),
    ...params,
  });
}
