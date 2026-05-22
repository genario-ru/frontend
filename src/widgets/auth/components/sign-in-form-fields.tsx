import { MarketingConsentText } from "@/features/auth/components/marketing-consent-text";
import { RequiredConsentText } from "@/features/auth/components/required-consent-text";
import { withForm } from "@/lib/tanstack-form";
import type { SignInFormSchema } from "@/widgets/auth/utils/sign-in-form-helpers";

export const SignInFormFields = withForm({
  defaultValues: {} as SignInFormSchema,
  render: ({ form }) => {
    return (
      <div className="mt-2 flex flex-col gap-2">
        <form.AppField name="isTermsAccepted">
          {(field) => <field.CheckboxField label={<RequiredConsentText />} />}
        </form.AppField>
        <form.AppField name="isMarketingAccepted">
          {(field) => <field.CheckboxField label={<MarketingConsentText />} />}
        </form.AppField>
      </div>
    );
  },
});
