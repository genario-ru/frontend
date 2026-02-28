import { useState } from "react";

import { useChangeEmail } from "@/actions/auth/hooks/use-change-email";
import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";
import { composeFullUrl } from "@/shared/utils/compose-full-url";

import type { AccountSettingsChangeEmailFormSchema } from "../types/account-settings-change-email-types";
import { changeEmailFormMatchFieldValidateFn } from "../utils/account-settings-change-email-form-helpers";

export function useAccountSettingsChangeEmailForm() {
  const [isEmailSentDialogOpen, setIsEmailSentDialogOpen] = useState(false);
  const { showErrorToast } = useToast();
  const { sessionData } = useGetSession();

  const { changeEmailAsync } = useChangeEmail({
    onSuccess: () => {
      setIsEmailSentDialogOpen(true);
    },
  });

  const form = useAppForm({
    defaultValues: {
      newEmail: sessionData?.user.email ?? "",
    } as AccountSettingsChangeEmailFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return changeEmailFormMatchFieldValidateFn(data);
        }
      },
      onSubmit: changeEmailFormMatchFieldValidateFn,
    },
    onSubmitInvalid: ({ formApi }) => {
      showErrorToast({
        description:
          `${formApi.state.errors[0]}` ||
          "Произошла ошибка при изменении Email",
      });
    },
    onSubmit: async ({ value: { newEmail } }) => {
      const callbackURL = composeFullUrl("/settings/account");

      await changeEmailAsync({
        data: {
          newEmail,
          callbackURL,
        },
      });
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
