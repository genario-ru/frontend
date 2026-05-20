import { useNavigate } from "@tanstack/react-router";

import { useSendVerificationOtp } from "@/actions/auth/hooks/use-send-verification-otp";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import type { SignInSearch } from "@/routes/_auth/sign-in";
import { useToast } from "@/shared/hooks/use-toast";

import {
  signInFormOptions,
  signInFormValidateFn,
} from "../utils/sign-in-form-helpers";

type UseSignInFormParams = SignInSearch;

export function useSignInForm({ email, redirect }: UseSignInFormParams) {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const { sendVerificationOtp, isVerificationOtpSending } =
    useSendVerificationOtp();

  const form = useAppForm({
    ...signInFormOptions({ email }),
    validators: {
      onChange: (data) => {
        if (data.formApi.state.submissionAttempts > 0) {
          return signInFormValidateFn(data);
        }
      },
      onSubmit: signInFormValidateFn,
    },
    onSubmit: async ({ value: { email, isMarketingAccepted } }) => {
      sendVerificationOtp(
        {
          data: {
            email,
            type: "sign-in",
          },
        },
        {
          onError: () => {
            showErrorToast({
              description:
                "Произошла ошибка при входе в аккаунт. Проверьте корректность введенных данных и попробуйте еще раз",
            });
          },
          onSuccess: () => {
            navigate({
              to: "/verify-otp",
              search: {
                redirect,
                email,
                isMarketingAccepted,
              },
            });
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isVerificationOtpSending,
    onFormSubmit,
  };
}
