import { useStore } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { isEmpty } from "es-toolkit/compat";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeftIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useCountdown } from "usehooks-ts";

import { useSendVerificationOtp } from "@/actions/auth/hooks/use-send-verification-otp";
import { useSignInEmailOtp } from "@/actions/auth/hooks/use-sign-in-email-otp";
import { APIError } from "@/lib/api/classes/api-error";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { OTPInput } from "@/shared/components/ui/otp-input";
import { useToast } from "@/shared/hooks/use-toast";

import {
  verifyOTPFormOptions,
  verifyOTPFormValidateFn,
} from "../utils/verify-otp-form-helpers";

type VerifyOTPFormProps = { email?: string };

export const VerifyOTPForm = ({ email }: VerifyOTPFormProps) => {
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
  });

  const {
    mutate: signIn,
    isPending: isSignInPending,
    isSuccess: isSignInSuccess,
  } = useSignInEmailOtp({
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
        to: "/home",
        replace: true,
        reloadDocument: true,
      });
    },
  });

  const form = useAppForm({
    ...verifyOTPFormOptions,
    validators: { onSubmit: verifyOTPFormValidateFn },
    onSubmit: async function ({ value }) {
      if (!email) return;

      signIn({
        body: {
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

  const OTPInputState = useMemo(() => {
    if (isSignInPending) return "loading";
    if (isValidationError) return "error";
    if (isSignInSuccess) return "success";

    return "default";
  }, [isSignInPending, isSignInSuccess, isValidationError]);

  const buttonState = useMemo(() => {
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
      body: {
        email,
        type: "sign-in",
      },
    });
  }, [email, isVerificationOtpSent, blockedSecondsLeft, sendVerificationOtp]);

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex w-full flex-col items-center gap-4"
    >
      <form.Field name="code">
        {(field) => (
          <FieldLayout
            errorMessage={field.state.meta.errorMap.onSubmit}
            className="w-fit"
          >
            <OTPInput
              maxLength={6}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              textAlign="center"
              pattern={REGEXP_ONLY_DIGITS}
              state={OTPInputState}
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              onComplete={onOTPInputComplete}
            />
          </FieldLayout>
        )}
      </form.Field>
      <div className="flex w-full max-w-[340px] gap-2">
        <ButtonLink
          size="lg"
          href="/sign-in"
          icon={<ArrowLeftIcon />}
          iconPosition="left"
        >
          Назад
        </ButtonLink>
        <Button
          type="button"
          size="lg"
          state={buttonState}
          disabled={buttonDisabled}
          onClick={onResendVerificationEmailButtonClick}
          className="flex-1"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};
