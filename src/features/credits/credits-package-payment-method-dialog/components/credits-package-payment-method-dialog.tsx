import type { PaymentMethodSchema } from "@/codegen/api/product";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

import { useCreditsPackagePaymentMethodDialog } from "../hooks/use-credits-package-payment-method-dialog";

type CreditsPackagePaymentMethodDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  packageTitle: string;
  packagePriceLabel: string;
  paymentMethods: PaymentMethodSchema[];
  onPayWithSavedMethod: (paymentMethodId: string) => void;
  onPayWithNewCard: () => void;
};

export function CreditsPackagePaymentMethodDialog({
  isOpen,
  setIsOpen,
  packageTitle,
  packagePriceLabel,
  paymentMethods,
  onPayWithSavedMethod,
  onPayWithNewCard,
}: CreditsPackagePaymentMethodDialogProps) {
  const { form, paymentMethodItems, onFormSubmit } =
    useCreditsPackagePaymentMethodDialog({
      paymentMethods,
      onPayWithSavedMethod,
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogPredefinedHeader
          title="Оплата пакета кредитов"
          description={`Пакет «${packageTitle}» за ${packagePriceLabel}. При оплате сохранённой картой деньги будут списаны с неё сразу, без перехода на страницу банка. Кредиты будут зачислены после подтверждения оплаты`}
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
            <form.AppField name="paymentMethodId">
              {(field) => (
                <field.RadioCardsGroupField
                  items={paymentMethodItems}
                  itemClassName="flex-1 flex-row items-center justify-center gap-2"
                />
              )}
            </form.AppField>
            <Button
              type="button"
              variant="neutral"
              priority="secondary"
              className="w-full"
              onClick={onPayWithNewCard}
            >
              Оплатить новой картой
            </Button>
          </DialogBody>
          <DialogFooter>
            <form.AppForm>
              <form.SubmitButton variant="accent" className="w-full">
                Оплатить
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
