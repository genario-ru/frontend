import { PlusIcon } from "lucide-react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

import { useCreditsPackagePaymentMethodDialog } from "../hooks/use-credits-package-payment-method-dialog";

type CreditsPackagePaymentMethodDrawerProps = {
  isOpen: boolean;
  packageTitle: string;
  packagePriceLabel: string;
  paymentMethods: PaymentMethodSchema[];
  setIsOpen: (isOpen: boolean) => void;
  onPayWithSavedMethod: (paymentMethodId: string) => void;
  onPayWithNewCard: () => void;
};

export function CreditsPackagePaymentMethodDrawer({
  isOpen,
  setIsOpen,
  packageTitle,
  packagePriceLabel,
  paymentMethods,
  onPayWithSavedMethod,
  onPayWithNewCard,
}: CreditsPackagePaymentMethodDrawerProps) {
  const { form, paymentMethodItems, onFormSubmit } =
    useCreditsPackagePaymentMethodDialog({
      paymentMethods,
      onPayWithSavedMethod,
    });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader
          title={`Покупка пакета «${packageTitle}» за ${packagePriceLabel}`}
          description={`При оплате сохранённой картой деньги спишутся с неё сразу, без перехода на страницу банка. Кредиты будут зачислены на баланс после подтверждения оплаты`}
        />
        <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
          <DrawerSection>
            <form.AppField name="paymentMethodId">
              {(field) => (
                <field.RadioCardsGroupField
                  items={paymentMethodItems}
                  className="flex-col"
                  itemClassName="w-full flex-row"
                />
              )}
            </form.AppField>
          </DrawerSection>
          <DrawerSection row roundedBottom={false} className="justify-between">
            <Button
              type="button"
              size="lg"
              variant="neutral"
              priority="secondary"
              icon={<PlusIcon />}
              onClick={onPayWithNewCard}
            >
              Оплатить новой картой
            </Button>
            <form.AppForm>
              <form.SubmitButton size="lg" variant="accent">
                Оплатить
              </form.SubmitButton>
            </form.AppForm>
          </DrawerSection>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
