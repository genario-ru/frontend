import { useStore } from "@tanstack/react-form";
import type { ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import {
  UploadZone,
  type UploadZoneProps,
} from "@/shared/components/ui/upload-zone";

import { useFieldContext } from "..";

type UploadZoneFieldProps = Omit<UploadZoneProps, "inputId" | "state"> & {
  label?: string | null;
  action?: ReactNode;
  fieldLayoutProps?: FieldLayoutProps;
};

export const UploadZoneField = ({
  label,
  action,
  fieldLayoutProps: { message, messageVariant, ...fieldLayoutProps } = {},
  ...props
}: UploadZoneFieldProps) => {
  const { name, store } = useFieldContext<unknown>();
  const errors: string[] = useStore(store, (state) => state.meta.errors);
  const uploadZoneState = errors.length > 0 ? "error" : "default";

  return (
    <FieldLayout
      labelHtmlFor={name}
      labelText={label}
      action={action}
      message={errors[0] ?? message}
      messageVariant={messageVariant}
      {...fieldLayoutProps}
    >
      <UploadZone inputId={name} state={uploadZoneState} {...props} />
    </FieldLayout>
  );
};
