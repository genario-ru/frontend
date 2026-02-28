import type { SignInSearch } from "@/routes/_auth/sign-in";

import { useSignInForm } from "../hooks/use-sign-in-form";

type SignInFormProps = SignInSearch;

export function SignInForm({ email, redirect }: SignInFormProps) {
  const { form, isVerificationOtpSending, onFormSubmit } = useSignInForm({
    email,
    redirect,
  });

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
          variant="accent"
          state={isVerificationOtpSending ? "loading" : "default"}
          className="w-full"
        >
          Продолжить
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
