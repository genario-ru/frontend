import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useUpdateUser } from "@/actions/auth/hooks/use-update-user";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import type { AccountSettingsChangeNameFormSchema } from "../types/account-settings-change-form-types";
import { changeNameFormMatchValidateFn } from "../utils/account-settings-change-name-form-helpers";

export function useAccountSettingsChangeNameForm() {
  const { sessionData, refetchSession } = useGetSession();
  const { updateUserAsync } = useUpdateUser();

  const form = useAppForm({
    defaultValues: {
      name: sessionData?.user.name ?? "",
    } as AccountSettingsChangeNameFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return changeNameFormMatchValidateFn(data);
        }
      },
      onSubmit: changeNameFormMatchValidateFn,
    },
    onSubmit: async ({ value, formApi }) => {
      await updateUserAsync({ data: value });
      await refetchSession();
      formApi.reset();
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, onFormSubmit };
}
