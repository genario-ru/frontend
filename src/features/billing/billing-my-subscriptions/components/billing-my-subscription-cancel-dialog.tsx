import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

type BillingMySubscriptionCancelDialogProps = {
  subscriptionName: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function BillingMySubscriptionCancelDialog({
  subscriptionName,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: BillingMySubscriptionCancelDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogPredefinedHeader
          title="Отменить подписку?"
          description={`Подписка по тарифу «${subscriptionName}» останется активной до конца оплаченного периода, после чего завершится автоматически. Новых списаний не будет. Вы сможете снова оформить подписку в любой момент`}
        />
        <DialogBody />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="neutral" priority="secondary">
              Отмена
            </Button>
          </DialogClose>
          <Button
            variant="negative"
            priority="primary"
            state={isPending ? "loading" : "default"}
            onClick={onConfirm}
          >
            Отменить подписку
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
