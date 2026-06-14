import { BookImageIcon, ChevronDownIcon, LightbulbIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

import { ArchiveAppMenubarActionsButtonLink } from "./archive-app-menubar-actions-button-link";

export function ArchiveAppMenubarDrawerActions() {
  return (
    <Drawer>
      <DrawerTrigger
        render={
          <Button priority="primary" icon={<ChevronDownIcon />}>
            Создать
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader title="Что создадим?" />
        <DrawerSection roundedBottom={false}>
          <ArchiveAppMenubarActionsButtonLink
            size="lg"
            iconPosition="left"
            icon={<LightbulbIcon />}
            to="/ideas-lists/settings"
          >
            Новые идеи
          </ArchiveAppMenubarActionsButtonLink>
          <ArchiveAppMenubarActionsButtonLink
            size="lg"
            iconPosition="left"
            icon={<BookImageIcon />}
            to="/scenarios/settings"
            className="w-full"
          >
            Новый сценарий
          </ArchiveAppMenubarActionsButtonLink>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
