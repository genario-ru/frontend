import type { ReactElement, ReactNode } from "react";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type BillingMySubscriptionsChangeTariffDialogProps = {
  trigger: ReactElement;
  isOpen: boolean;
  body: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
};

export function BillingMySubscriptionsChangeTariffDialog({
  trigger,
  isOpen,
  body,
  setIsOpen,
}: BillingMySubscriptionsChangeTariffDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-fit max-w-6xl">
        <DialogPredefinedHeader
          title="Изменить тариф"
          description="Новый тариф заменит текущий: изменятся стоимость подписки и доступные лимиты"
        />
        <DialogBody className="flex-row gap-2">{body}</DialogBody>
      </DialogContent>
    </Dialog>
  );
}
