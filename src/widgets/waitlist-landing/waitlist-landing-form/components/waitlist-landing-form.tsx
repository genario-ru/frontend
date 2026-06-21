import { WaitlistLandingFormHeader } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-header";
import { WaitlistLandingFormMarketingConsentText } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-marketing-consent-text";
import { WaitlistLandingFormPrivacyConsentText } from "@/features/waitlist-landing/waitlist-landing-form/components/waitlist-landing-form-privacy-consent-text";
import { waitlistLandingFormInterests } from "@/features/waitlist-landing/waitlist-landing-form/constants/waitlist-landing-form-interests";
import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";

import { useWaitlistLandingForm } from "../hooks/use-waitlist-landing-form";

export function WaitlistLandingForm() {
  const { form, onFormSubmit } = useWaitlistLandingForm();

  return (
    <WaitlistLandingIsland
      id="waitlist-form"
      className="items-center gap-8 sm:gap-10"
    >
      <WaitlistLandingFormHeader />
      <form
        onSubmit={onFormSubmit}
        className="flex w-full max-w-3xl flex-col gap-4"
      >
        <form.AppField name="email">
          {(field) => (
            <field.InputField
              size="lg"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.ru"
            />
          )}
        </form.AppField>
        <form.AppField name="interests">
          {(field) => (
            <field.CheckboxChipsField
              title="Что вам важнее всего?"
              items={waitlistLandingFormInterests}
              itemProps={{
                size: "lg",
                className: "w-full md:w-fit",
              }}
              className="flex-col md:flex-row"
            />
          )}
        </form.AppField>
        <form.AppField name="comment">
          {(field) => (
            <field.TextareaField
              label="Чего не хватает в других сервисах? Что хотели бы видеть?"
              placeholder="Своими словами — это поможет сделать продукт полезным именно вам."
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
            Оставить заявку
          </form.SubmitButton>
        </form.AppForm>
      </form>
    </WaitlistLandingIsland>
  );
}
