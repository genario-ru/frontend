import { LegalConsentText } from "@/features/auth/components/legal-consent-text";
import { MarketingConsentText } from "@/features/auth/components/marketing-consent-text";
import { withForm } from "@/lib/tanstack-form";
import type { SignInFormSchema } from "@/widgets/auth/utils/sign-in-form-helpers";

export const SignInFormFields = withForm({
  defaultValues: {} as SignInFormSchema,
  render: ({ form }) => {
    return (
      <div className="mt-2 flex flex-col gap-2">
        <form.AppField name="isLegalAccepted">
          {(field) => <field.CheckboxField label={<LegalConsentText />} />}
        </form.AppField>
        <form.AppField name="isMarketingAccepted">
          {(field) => <field.CheckboxField label={<MarketingConsentText />} />}
        </form.AppField>
      </div>
    );
  },
});
