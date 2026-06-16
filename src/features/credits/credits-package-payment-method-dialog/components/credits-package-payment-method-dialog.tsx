import { PlusIcon } from "lucide-react";

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
      <DialogContent className="max-w-xl">
        <DialogPredefinedHeader
          title={`Покупка пакета «${packageTitle}» за ${packagePriceLabel}`}
          description={`При оплате сохранённой картой деньги спишутся с неё сразу, без перехода на страницу банка. Кредиты будут зачислены на баланс после подтверждения оплаты`}
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
            <form.AppField name="paymentMethodId">
              {(field) => (
                <field.RadioCardsGroupField
                  items={paymentMethodItems}
                  className="flex-col"
                  itemProps={{
                    align: "start",
                    className: "w-full flex-row",
                  }}
                />
              )}
            </form.AppField>
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              variant="neutral"
              priority="secondary"
              icon={<PlusIcon />}
              onClick={onPayWithNewCard}
            >
              Оплатить новой картой
            </Button>
            <form.AppForm>
              <form.SubmitButton variant="accent">Оплатить</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
