import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

type BillingMyPaymentMethodDeleteDrawerProps = {
  paymentMethodName: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function BillingMyPaymentMethodDeleteDrawer({
  paymentMethodName,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: BillingMyPaymentMethodDeleteDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader
          title="Удалить способ оплаты?"
          description={`Способ оплаты «${paymentMethodName}» будет отвязан от аккаунта, и им больше нельзя будет оплачивать подписку и пакеты кредитов. При необходимости вы сможете привязать его заново`}
        />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose
            render={
              <Button size="lg" variant="neutral" priority="secondary">
                Отмена
              </Button>
            }
          />
          <Button
            size="lg"
            variant="negative"
            priority="primary"
            state={isPending ? "loading" : "default"}
            onClick={onConfirm}
          >
            Удалить
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
