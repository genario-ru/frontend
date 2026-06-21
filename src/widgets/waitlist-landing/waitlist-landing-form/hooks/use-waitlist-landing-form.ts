import { useState } from "react";

import { useCreateApplication } from "@/actions/applications/hooks/use-create-application";
import {
  waitlistLandingFormOptions,
  waitlistLandingFormValidateFn,
} from "@/features/waitlist-landing/waitlist-landing-form/utils/waitlist-landing-form-helpers";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

const CREATE_APPLICATION_ERROR_DESCRIPTION =
  "Не удалось отправить заявку. Попробуйте ещё раз чуть позже.";

export function useWaitlistLandingForm() {
  const { showErrorToast } = useToast();
  const { createApplication, isApplicationCreating } = useCreateApplication();
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const form = useAppForm({
    ...waitlistLandingFormOptions(),
    validators: {
      onChange: (data) => {
        if (data.formApi.state.submissionAttempts > 0) {
          return waitlistLandingFormValidateFn(data);
        }
      },
      onSubmit: waitlistLandingFormValidateFn,
    },
    onSubmit: ({ value }) => {
      createApplication(
        {
          data: {
            email: value.email,
            featureIds: value.interests,
            comment: value.comment || undefined,
            marketingAccepted: value.isMarketingAccepted,
          },
        },
        {
          onSuccess: () => {
            setIsApplicationSubmitted(true);
          },
          onError: () => {
            showErrorToast({
              description: CREATE_APPLICATION_ERROR_DESCRIPTION,
            });
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    onFormSubmit,
    isApplicationCreating,
    isApplicationSubmitted,
  };
}
