import { useCallback } from "react";

import { useCreateProfilesFromChannels } from "@/actions/profiles/hooks/use-create-profiles-from-channels";
import { useValidateProfileChannel } from "@/actions/profiles/hooks/use-validate-profile-channel";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import type { ProfilesImportFormValues } from "../schemas/profiles-import-form-schema";
import { profilesImportFormValidateFn } from "../utils/profile-import-form-helpers";
import { useProfilesImportFormValidations } from "./use-profiles-import-form-validations";

export function useProfilesImportForm() {
  const { showErrorToast } = useToast();

  const { validateProfileChannel, isValidateProfileChannelPending } =
    useValidateProfileChannel();

  const { createProfilesFromChannels, isCreateProfilesFromChannelsPending } =
    useCreateProfilesFromChannels();

  const {
    successValidationFields,
    activeValidationFieldIndex,
    addSuccessValidationField,
    removeSuccessValidationField,
    setActiveValidationFieldIndex,
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

  const handleValidateProfileChannel = useCallback(
    (channelUrl: string, index: number) => {
      if (isValidateProfileChannelPending) {
        return;
      }

      form.validateField(`channelUrls[${index}]`, "submit");

      const fieldMeta = form.getFieldMeta(`channelUrls[${index}]`);
      const isValid = fieldMeta && fieldMeta.isValid;

      if (!isValid) {
        removeSuccessValidationField(index);
        return;
      }

      setActiveValidationFieldIndex(index);

      validateProfileChannel(
        { data: { url: channelUrl } },
        {
          onSettled: () => {
            resetActiveValidationFieldIndex();
          },
          onSuccess: ({ data }) => {
            if (data.status === "error") {
              removeSuccessValidationField(index);

              form.setFieldMeta(`channelUrls[${index}]`, (meta) => ({
                ...meta,
                errorMap: {
                  ...meta.errorMap,
                  onSubmit: data.statusDetails,
                },
              }));
            } else {
              addSuccessValidationField(index);
            }
          },
        },
      );
    },
    [
      form,
      isValidateProfileChannelPending,
      validateProfileChannel,
      addSuccessValidationField,
      removeSuccessValidationField,
      setActiveValidationFieldIndex,
      resetActiveValidationFieldIndex,
    ],
  );

  const handleAddProfileChannel = useCallback(() => {
    form.pushFieldValue("channelUrls", "");
  }, [form]);

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    successValidationFields,
    activeValidationFieldIndex,
    isCreateProfilesFromChannelsPending,
    onFormSubmit,
    handleValidateProfileChannel,
    handleAddProfileChannel,
  };
}
