import {
  waitlistLandingFormOptions,
  waitlistLandingFormValidateFn,
} from "@/features/waitlist-landing/waitlist-landing-form/utils/waitlist-landing-form-helpers";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

export function useWaitlistLandingForm() {
  const { showSuccessToast } = useToast();

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
    onSubmit: ({ formApi }) => {
      showSuccessToast({
        title: "Заявка отправлена",
        description: "Спасибо! Мы напишем вам, как только откроем доступ.",
      });

      formApi.reset();
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, onFormSubmit };
}
