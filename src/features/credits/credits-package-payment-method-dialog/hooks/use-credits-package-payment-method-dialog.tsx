import { useMemo } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { getPaymentMethodDisplay } from "@/features/billing/payment-method-display/utils/get-payment-method-display";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { SvgIcon } from "@/shared/components/ui/svg-icon";

import type { CreditsPackagePaymentMethodFormSchema } from "../types/credits-package-payment-method-form-types";
import { creditsPackagePaymentMethodFormValidateFn } from "../utils/credits-package-payment-method-form-helpers";

type UseCreditsPackagePaymentMethodDialogParams = {
  paymentMethods: PaymentMethodSchema[];
  onPayWithSavedMethod: (paymentMethodId: string) => void;
};

export function useCreditsPackagePaymentMethodDialog({
  paymentMethods,
  onPayWithSavedMethod,
}: UseCreditsPackagePaymentMethodDialogParams) {
  // По умолчанию предвыбран основной способ оплаты (или первый из списка).
  const defaultPaymentMethodId = useMemo(
    () =>
      paymentMethods.find((paymentMethod) => paymentMethod.default)?.id ??
      paymentMethods[0]?.id ??
      "",
    [paymentMethods],
  );

  const paymentMethodItems = useMemo(
    () =>
      paymentMethods.map((paymentMethod) => {
        const { title, icon } = getPaymentMethodDisplay(paymentMethod);
        const label = paymentMethod.default ? `${title} · Основная` : title;

        return {
          value: paymentMethod.id,
          label,
          icon: <SvgIcon icon={icon} className="stroke-transparent" />,
        };
      }),
    [paymentMethods],
  );

  const form = useAppForm({
    defaultValues: {
      paymentMethodId: defaultPaymentMethodId,
    } as CreditsPackagePaymentMethodFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return creditsPackagePaymentMethodFormValidateFn(data);
        }
      },
      onSubmit: creditsPackagePaymentMethodFormValidateFn,
    },
    onSubmit: ({ value }) => {
      onPayWithSavedMethod(value.paymentMethodId);
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    paymentMethodItems,
    onFormSubmit,
  };
}
