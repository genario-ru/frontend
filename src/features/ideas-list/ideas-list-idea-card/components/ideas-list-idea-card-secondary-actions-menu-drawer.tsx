import { EllipsisIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

type IdeasListIdeaCardSecondaryActionsMenuDrawerProps = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export function IdeasListIdeaCardSecondaryActionsMenuDrawer({
  isOpen,
  setIsOpen,
  children,
}: IdeasListIdeaCardSecondaryActionsMenuDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger
        render={<Button priority="tertiary" icon={<EllipsisIcon />} />}
      />
      <DrawerContent>
        <DrawerHeader title="Действия с идеей" />
        <DrawerSection roundedBottom={false}>{children}</DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
