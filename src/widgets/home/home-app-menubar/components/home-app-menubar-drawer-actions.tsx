import { BookImageIcon, ChevronDownIcon, LightbulbIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

import { HomeAppMenubarActionsButtonLink } from "./home-app-menubar-actions-button";

export function HomeAppMenubarDrawerActions() {
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
          <HomeAppMenubarActionsButtonLink
            size="lg"
            iconPosition="left"
            icon={<LightbulbIcon />}
            to="/ideas-lists/settings"
          >
            Новые идеи
          </HomeAppMenubarActionsButtonLink>
          <HomeAppMenubarActionsButtonLink
            size="lg"
            iconPosition="left"
            icon={<BookImageIcon />}
            to="/scenarios/settings"
            className="w-full"
          >
            Новый сценарий
          </HomeAppMenubarActionsButtonLink>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
