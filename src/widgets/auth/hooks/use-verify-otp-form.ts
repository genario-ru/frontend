import { useStore } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { isEmpty } from "es-toolkit/compat";
import { useCallback, useMemo } from "react";
import { useCountdown } from "usehooks-ts";

import { useSendVerificationOtp } from "@/actions/auth/hooks/use-send-verification-otp";
import { useSignInEmailOtp } from "@/actions/auth/hooks/use-sign-in-email-otp";
import { APIError } from "@/lib/api/classes/api-error";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import type { VerifyOTPSearch } from "@/routes/_auth/verify-otp";
import type { ButtonProps } from "@/shared/components/ui/button";
import type { OTPInputProps } from "@/shared/components/ui/otp-input";
import { useToast } from "@/shared/hooks/use-toast";

import {
  verifyOTPFormOptions,
  verifyOTPFormValidateFn,
} from "../utils/verify-otp-form-helpers";

type UseVerificationOTPFormParams = VerifyOTPSearch;

export function useVerifyOTPForm({
  email,
  redirect = "/home",
}: UseVerificationOTPFormParams) {
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();

  const [blockedSecondsLeft, { startCountdown, resetCountdown }] = useCountdown(
    { countStart: 60 },
  );

  const {
    sendVerificationOtp,
    isVerificationOtpSending,
    isVerificationOtpSent,
  } = useSendVerificationOtp({
    mutation: {
      onMutate: () => resetCountdown(),
      onSuccess: () => {
        startCountdown();
        showSuccessToast({
          title: "Код отправлен",
          description: "Код подтверждения был повторно отправлен на вашу почту",
        });
      },
      onError: () => {
        showErrorToast({
          description: "Произошла ошибка при повторной отправке кода. ",
        });
      },
    },
  });

  const {
    mutate: signIn,
    isPending: isSignInPending,
    isSuccess: isSignInSuccess,
  } = useSignInEmailOtp({
    mutation: {
      onError: (error) => {
        if (error instanceof APIError && error.cause.status === 400) {
          form.setFieldMeta("code", (meta) => ({
            ...meta,
            errorMap: {
              ...meta.errorMap,
              onSubmit: "Неправильный код",
            },
          }));

          showErrorToast({
            description: "Неправильный код",
          });
        } else {
          showErrorToast({
            description:
              "Произошла ошибка при входе в аккаунт. Попробуйте еще раз чуть позже",
          });
        }
      },
      onSuccess: async () => {
        navigate({
          to: redirect,
          replace: true,
          reloadDocument: true,
        });
      },
    },
  });

  const form = useAppForm({
    ...verifyOTPFormOptions,
    validators: { onSubmit: verifyOTPFormValidateFn },
    onSubmit: async function ({ value }) {
      if (!email) return;

      signIn({
        data: {
          email,
          otp: value.code,
        },
      });
    },
  });

  const { isValidationError } = useStore(form.store, (state) => ({
    isValidationError: !isEmpty(state.fieldMeta.code?.errorMap?.onSubmit),
  }));

  const { onFormSubmit } = useFormHandlers({ form });

  const OTPInputState: OTPInputProps["state"] = useMemo(() => {
    if (isSignInPending) return "loading";
    if (isValidationError) return "error";
    if (isSignInSuccess) return "success";

    return "default";
  }, [isSignInPending, isSignInSuccess, isValidationError]);

  const buttonState: ButtonProps["state"] = useMemo(() => {
    if (isVerificationOtpSending) return "loading";

    return "default";
  }, [isVerificationOtpSending]);

  const buttonDisabled = useMemo(() => {
    if (isVerificationOtpSending) return true;
    if (isVerificationOtpSent && blockedSecondsLeft > 0) return true;

    return false;
  }, [isVerificationOtpSending, isVerificationOtpSent, blockedSecondsLeft]);

  const buttonText = useMemo(() => {
    if (isVerificationOtpSent && blockedSecondsLeft > 0) {
      return `Отправить снова (${blockedSecondsLeft})`;
    }

    return "Отправить снова";
  }, [isVerificationOtpSent, blockedSecondsLeft]);

  const onOTPInputComplete = useCallback(() => {
    form.handleSubmit();
  }, [form]);

  const onResendVerificationEmailButtonClick = useCallback(() => {
    if (!email) return;
    if (isVerificationOtpSent && blockedSecondsLeft <= 0) return;

    sendVerificationOtp({
      data: {
        email,
        type: "sign-in",
      },
    });
  }, [email, isVerificationOtpSent, blockedSecondsLeft, sendVerificationOtp]);

  return {
    form,
    OTPInputState,
    buttonState,
    buttonDisabled,
    buttonText,
    onFormSubmit,
    onOTPInputComplete,
    onResendVerificationEmailButtonClick,
  };
}
