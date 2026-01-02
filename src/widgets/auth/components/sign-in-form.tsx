import { useNavigate } from "@tanstack/react-router";

import { useSendVerificationOtp } from "@/actions/auth/hooks/use-send-verification-otp";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import {
  signInFormOptions,
  signInFormValidateFn,
} from "../utils/sign-in-form-helpers";

export const SignInForm = () => {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const {
    mutate: sendVerificationOTP,
    isPending: isSendVerificationOTPPending,
  } = useSendVerificationOtp({
    onError: () => {
      showErrorToast({
        description:
          "Произошла ошибка при входе в аккаунт. Проверьте корректность введенных данных и попробуйте еще раз",
      });
    },
    onSuccess: (_data, { body: { email } }) => {
      navigate({
        to: `/verify-otp`,
        search: {
          email,
        },
      });
    },
  });

  const form = useAppForm({
    ...signInFormOptions,
    validators: {
      onChange: (data) => {
        if (data.formApi.state.submissionAttempts > 0) {
          return signInFormValidateFn(data);
        }
      },
      onSubmit: signInFormValidateFn,
    },
    onSubmit: async ({ value }) => {
      sendVerificationOTP({
        body: {
          email: value.email,
          type: "sign-in",
        },
      });
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-2">
      <form.AppField name="email">
        {(field) => (
          <field.InputField size="lg" placeholder="ivan@example.ru" />
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton
          size="lg"
          state={isSendVerificationOTPPending ? "loading" : "default"}
          className="w-full"
        >
          Продолжить
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
