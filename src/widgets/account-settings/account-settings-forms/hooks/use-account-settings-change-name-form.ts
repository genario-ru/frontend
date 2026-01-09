import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useUpdateUser } from "@/actions/auth/hooks/use-update-user";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

export function useAccountSettingsChangeNameForm() {
  const { sessionData, refetchSession } = useGetSession();
  const { updateUserAsync } = useUpdateUser();

  const form = useAppForm({
    defaultValues: { name: sessionData?.user.name ?? "" },
    onSubmit: async ({ value, formApi }) => {
      debugger;
      await updateUserAsync({ body: value });
      await refetchSession();
      formApi.reset();
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, onFormSubmit };
}
