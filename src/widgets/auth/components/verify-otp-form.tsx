import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeftIcon } from "lucide-react";

import type { VerifyOTPSearch } from "@/routes/_auth/verify-otp";
import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { OTPInput } from "@/shared/components/ui/otp-input";

import { useVerifyOTPForm } from "../hooks/use-verify-otp-form";

type VerifyOTPFormProps = VerifyOTPSearch;

export const VerifyOTPForm = ({ email, redirect }: VerifyOTPFormProps) => {
  const {
    form,
    OTPInputState,
    buttonState,
    buttonDisabled,
    buttonText,
    onFormSubmit,
    onOTPInputComplete,
    onResendVerificationEmailButtonClick,
  } = useVerifyOTPForm({ email, redirect });

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
