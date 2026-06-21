import { WaitlistLandingFormAside } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-aside";
import { WaitlistLandingFormHeader } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-header";
import { WaitlistLandingFormMarketingConsentText } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-marketing-consent-text";
import { WaitlistLandingFormPrivacyConsentText } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-privacy-consent-text";
import {
  WAITLIST_LANDING_FORM_COMMENT_LABEL,
  WAITLIST_LANDING_FORM_COMMENT_PLACEHOLDER,
  WAITLIST_LANDING_FORM_EMAIL_LABEL,
  WAITLIST_LANDING_FORM_EMAIL_PLACEHOLDER,
  WAITLIST_LANDING_FORM_INTERESTS_TITLE,
  WAITLIST_LANDING_FORM_SUBMIT_TEXT,
} from "@/features/waitlist-landing/waitlist-landing-form/constants/waitlist-landing-form-fields";
import { waitlistLandingFormInterests } from "@/features/waitlist-landing/waitlist-landing-form/constants/waitlist-landing-form-interests";
import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";

import { useWaitlistLandingForm } from "../hooks/use-waitlist-landing-form";

export function WaitlistLandingForm() {
  const { form, onFormSubmit } = useWaitlistLandingForm();

  return (
    <WaitlistLandingIsland
      id="waitlist-form"
      className="bg-neutral-1 items-center gap-8 sm:gap-10"
    >
      <WaitlistLandingFormHeader />
      <div className="grid w-full gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <WaitlistLandingFormAside />
        <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-4">
          <form.AppField name="email">
            {(field) => (
              <field.InputField
                size="lg"
                label={WAITLIST_LANDING_FORM_EMAIL_LABEL}
                type="email"
                autoComplete="email"
                placeholder={WAITLIST_LANDING_FORM_EMAIL_PLACEHOLDER}
              />
            )}
          </form.AppField>
          <form.AppField name="interests">
            {(field) => (
              <field.CheckboxChipsField
                title={WAITLIST_LANDING_FORM_INTERESTS_TITLE}
                items={waitlistLandingFormInterests}
                itemProps={{ className: "w-full md:w-fit" }}
                className="flex-col md:flex-row"
              />
            )}
          </form.AppField>
          <form.AppField name="comment">
            {(field) => (
              <field.TextareaField
                label={WAITLIST_LANDING_FORM_COMMENT_LABEL}
                placeholder={WAITLIST_LANDING_FORM_COMMENT_PLACEHOLDER}
              />
            )}
          </form.AppField>
          <div className="flex flex-col gap-2">
            <form.AppField name="isPrivacyAccepted">
              {(field) => (
                <field.CheckboxField
                  label={<WaitlistLandingFormPrivacyConsentText />}
                />
              )}
            </form.AppField>
            <form.AppField name="isMarketingAccepted">
              {(field) => (
                <field.CheckboxField
                  label={<WaitlistLandingFormMarketingConsentText />}
                />
              )}
            </form.AppField>
          </div>
          <form.AppForm>
            <form.SubmitButton size="lg" variant="accent" className="w-full">
              {WAITLIST_LANDING_FORM_SUBMIT_TEXT}
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </div>
    </WaitlistLandingIsland>
  );
}
