import { useCallback } from "react";

import { useCreateProfilesFromChannels } from "@/actions/profiles/hooks/use-create-profiles-from-channels";
import { useValidateProfileChannel } from "@/actions/profiles/hooks/use-validate-profile-channel";
import { createProfilesFromChannelsErrorSchemaSchema } from "@/codegen/api/product";
import { isAPIError } from "@/lib/api/utils/is-api-error";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import type { ProfilesImportFormValues } from "../schemas/profiles-import-form-schema";
import { profilesImportFormValidateFn } from "../utils/profile-import-form-helpers";

export function useProfilesImportForm() {
  const { showErrorToast } = useToast();
  const { createProfilesFromChannels } = useCreateProfilesFromChannels();
  const { validateProfileChannel } = useValidateProfileChannel();

  const form = useAppForm({
    defaultValues: {
      channelUrls: [""],
    } as ProfilesImportFormValues,
    validators: {
      onSubmit: profilesImportFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      createProfilesFromChannels(
        {
          data: value,
        },
        {
          onError: (error) => {
            if (
              !isAPIError(error, createProfilesFromChannelsErrorSchemaSchema)
            ) {
              showErrorToast({
                title: "Ошибка создания профилей",
                description:
                  "Произошла ошибка при создании профилей. Попробуйте еще раз немного позже",
              });

              return;
            }

            const { data } = error.cause.data;

            data.forEach((item, index) => {
              if (item.status === "error") {
                formApi.setFieldMeta(`channelUrls[${index}]`, (meta) => ({
                  ...meta,
                  errorMap: {
                    ...meta.errorMap,
                    onSubmit: item.statusDetails,
                  },
                }));
              }
            });
          },
        },
      );
    },
  });

  const handleValidateProfileChannel = useCallback(
    (channelUrl: string, index: number) => {
      validateProfileChannel(
        { data: { url: channelUrl } },
        {
          onSuccess: ({ data }) => {
            if (data.status === "error") {
              form.setFieldMeta(`channelUrls[${index}]`, (meta) => ({
                ...meta,
                errorMap: {
                  ...meta.errorMap,
                  onSubmit: data.statusDetails,
                },
              }));
            }
          },
        },
      );
    },
    [form, validateProfileChannel],
  );

  const handleAddProfileChannel = useCallback(() => {
    form.pushFieldValue("channelUrls", "");
  }, [form]);

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    onFormSubmit,
    handleValidateProfileChannel,
    handleAddProfileChannel,
  };
}
