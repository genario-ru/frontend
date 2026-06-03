import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

type BillingMyPaymentMethodDeleteDialogProps = {
  paymentMethodName: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function BillingMyPaymentMethodDeleteDialog({
  paymentMethodName,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: BillingMyPaymentMethodDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogPredefinedHeader
          title="Удалить способ оплаты?"
          description={`Вы уверены, что хотите удалить способ оплаты «${paymentMethodName}»?`}
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
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
