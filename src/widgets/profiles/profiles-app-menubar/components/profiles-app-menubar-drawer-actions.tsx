import { ChevronDownIcon, HandIcon, ImportIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

import { ProfilesAppMenubarActionsButtonLink } from "./profiles-app-menubar-actions-button-link";

export function ProfilesAppMenubarDrawerActions() {
  return (
    <Drawer>
      <DrawerTrigger
        render={
          <Button priority="primary" icon={<ChevronDownIcon />}>
            Новый профиль
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader title="Какой профиль создадим?" />
        <DrawerSection roundedBottom={false}>
          <ProfilesAppMenubarActionsButtonLink
            size="lg"
            iconPosition="left"
            className="w-full"
            icon={<ImportIcon />}
            to="/profiles/import"
          >
            Импорт канала
          </ProfilesAppMenubarActionsButtonLink>
          <ProfilesAppMenubarActionsButtonLink
            size="lg"
            iconPosition="left"
            className="w-full"
            icon={<HandIcon />}
            to="/profiles/settings"
          >
            Создать вручную
          </ProfilesAppMenubarActionsButtonLink>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
