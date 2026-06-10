import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

type BillingMySubscriptionCancelDialogDrawerProps = {
  subscriptionName: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function BillingMySubscriptionCancelDialogDrawer({
  subscriptionName,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: BillingMySubscriptionCancelDialogDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader
          title="Отменить подписку?"
          description={`Подписка по тарифу «${subscriptionName}» останется активной до конца оплаченного периода, после чего завершится автоматически. Новых списаний не будет. Вы сможете снова оформить подписку в любой момент`}
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
            Отменить подписку
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
