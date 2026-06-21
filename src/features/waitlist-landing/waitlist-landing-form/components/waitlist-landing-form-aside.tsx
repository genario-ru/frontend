import { CheckCircle2Icon } from "lucide-react";

import {
  WAITLIST_LANDING_FORM_ASIDE_DESCRIPTION,
  WAITLIST_LANDING_FORM_ASIDE_TITLE,
  waitlistLandingFormBenefits,
} from "../constants/waitlist-landing-form-benefits";

export function WaitlistLandingFormAside() {
  return (
    <aside className="from-neutral-8 to-accent-7 dark:from-neutral-1 dark:to-accent-6 rounded-5 text-neutral-1 dark:text-neutral-8 flex h-full flex-col justify-between gap-8 bg-linear-to-br p-5 sm:p-6">
      <div className="flex flex-col gap-3">
        <p className="text-2xl leading-tight font-semibold">
          {WAITLIST_LANDING_FORM_ASIDE_TITLE}
        </p>
        <p className="text-neutral-1/65 dark:text-neutral-8/65">
          {WAITLIST_LANDING_FORM_ASIDE_DESCRIPTION}
        </p>
      </div>
      <div className="text-neutral-1/75 dark:text-neutral-8/75 grid gap-3 text-sm">
        {waitlistLandingFormBenefits.map((item) => (
          <div
            key={`waitlist-landing-form-benefit-${item}`}
            className="flex items-start gap-2"
          >
            <CheckCircle2Icon className="stroke-positive-4 mt-0.5 size-4 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
