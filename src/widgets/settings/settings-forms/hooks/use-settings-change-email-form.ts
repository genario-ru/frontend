import { useState } from "react";

import { useChangeEmail } from "@/actions/auth/hooks/use-change-email";
import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { composeFullUrl } from "@/shared/utils/compose-full-url";

import type { SettingsChangeEmailFormSchema } from "../types/settings-change-email-types";
import { changeEmailFormMatchValidateFn } from "../utils/settings-change-email-form-helpers";

export function useSettingsChangeEmailForm() {
  const [isEmailSentDialogOpen, setIsEmailSentDialogOpen] = useState(false);
  const { sessionData } = useGetSession();

  const { changeEmailAsync } = useChangeEmail();

  const form = useAppForm({
    defaultValues: {
      newEmail: sessionData?.user.email ?? "",
    } as SettingsChangeEmailFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return changeEmailFormMatchValidateFn(data);
        }
      },
      onSubmit: changeEmailFormMatchValidateFn,
    },
    onSubmit: async ({ value: { newEmail } }) => {
      const callbackURL = composeFullUrl("/settings/account");

      await changeEmailAsync({
        data: {
          newEmail,
          callbackURL,
        },
      });

      setIsEmailSentDialogOpen(true);
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isEmailSentDialogOpen,
    setIsEmailSentDialogOpen,
    onFormSubmit,
  };
}
