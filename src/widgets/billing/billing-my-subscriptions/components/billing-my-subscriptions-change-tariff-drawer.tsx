import type { ReactElement, ReactNode } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

type BillingMySubscriptionsChangeTariffDrawerProps = {
  trigger: ReactElement;
  isOpen: boolean;
  body: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
};

export function BillingMySubscriptionsChangeTariffDrawer({
  trigger,
  isOpen,
  body,
  setIsOpen,
}: BillingMySubscriptionsChangeTariffDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger render={trigger} />
      <DrawerContent>
        <DrawerHeader
          title="Изменить тариф"
          description="Новый тариф заменит текущий: изменятся стоимость подписки и доступные лимиты"
        />
        <DrawerSection roundedBottom={false}>{body}</DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
