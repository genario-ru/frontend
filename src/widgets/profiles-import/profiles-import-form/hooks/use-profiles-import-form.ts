import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { useCreateProfilesFromChannels } from "@/actions/profiles/hooks/use-create-profiles-from-channels";
import { useValidateProfileChannel } from "@/actions/profiles/hooks/use-validate-profile-channel";
import { getApiV1ProfilesChannelsJobsMyQueryKey } from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import type { ProfilesImportFormValues } from "../schemas/profiles-import-form-schema";
import { profilesImportFormValidateFn } from "../utils/profile-import-form-helpers";
import { useProfilesImportFormValidations } from "./use-profiles-import-form-validations";

export function useProfilesImportForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const { createProfilesFromChannels, isCreateProfilesFromChannelsPending } =
    useCreateProfilesFromChannels();

  const {
    successValidationFields,
    activeValidationFields,
    addSuccessValidationField,
    removeSuccessValidationField,
    addActiveValidationFieldIndex,
    resetActiveValidationFieldIndex,
  } = useProfilesImportFormValidations();

  const form = useAppForm({
    defaultValues: {
      channelUrls: [""],
    } as ProfilesImportFormValues,
    validators: {
      onSubmit: profilesImportFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      if (isValidateProfileChannelPending) {
        return;
      }

      createProfilesFromChannels(
        { data: value },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getApiV1ProfilesChannelsJobsMyQueryKey(),
            });

            navigate({ to: "/profiles" });
          },
          onError: (error) => {
            const errorData = error.cause.data;

            if (typeof errorData === "string") {
              showErrorToast({
                title: "Ошибка создания профилей",
                description: errorData,
              });

              return;
            }

            const { data } = errorData;

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

  const { validateProfileChannel, isValidateProfileChannelPending } =
    useValidateProfileChannel({
      mutation: {
        onSuccess: ({ data }, { data: { url } }) => {
          const channelUrls = form.getFieldValue("channelUrls");
          const fieldIndex = channelUrls.indexOf(url);

          if (fieldIndex === -1) {
            return;
          }

          if (data.status === "error") {
            removeSuccessValidationField(fieldIndex);

            form.setFieldMeta(`channelUrls[${fieldIndex}]`, (meta) => ({
              ...meta,
              errorMap: {
                ...meta.errorMap,
                onSubmit: data.statusDetails,
              },
            }));
          } else {
            addSuccessValidationField(fieldIndex);
          }
        },
        onSettled: (_response, _error, variables) => {
          const channelUrls = form.getFieldValue("channelUrls");
          const fieldIndex = channelUrls.indexOf(variables.data.url);

          if (fieldIndex === -1) {
            return;
          }

          resetActiveValidationFieldIndex(fieldIndex);
        },
      },
    });

  const handleValidateProfileChannel = useCallback(
    (channelUrl: string, index: number) => {
      if (activeValidationFields.includes(index)) {
        return;
      }

      form.validateField(`channelUrls[${index}]`, "submit");

      const fieldMeta = form.getFieldMeta(`channelUrls[${index}]`);
      const isValid = fieldMeta && fieldMeta.isValid;

      if (!isValid) {
        removeSuccessValidationField(index);
        return;
      }

      addActiveValidationFieldIndex(index);
      validateProfileChannel({ data: { url: channelUrl } });
    },
    [
      form,
      activeValidationFields,
      addActiveValidationFieldIndex,
      validateProfileChannel,
      removeSuccessValidationField,
    ],
  );

  const handleAddProfileChannel = useCallback(() => {
    form.pushFieldValue("channelUrls", "");
  }, [form]);

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    successValidationFields,
    activeValidationFields,
    isCreateProfilesFromChannelsPending,
    onFormSubmit,
    handleValidateProfileChannel,
    handleAddProfileChannel,
  };
}
