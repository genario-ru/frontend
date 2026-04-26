import { ChevronDownIcon, HandIcon, ImportIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { ProfilesAppMenubarActionsButtonLink } from "./profiles-app-menubar-actions-button-link";

export function ProfilesAppMenubarActions() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button priority="primary" icon={<ChevronDownIcon />}>
          Новый профиль
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <ProfilesAppMenubarActionsButtonLink
            icon={<ImportIcon />}
            to="/profiles/import"
          >
            Импорт канала
          </ProfilesAppMenubarActionsButtonLink>
          <ProfilesAppMenubarActionsButtonLink
            icon={<HandIcon />}
            to="/profiles/settings"
          >
            Создать вручную
          </ProfilesAppMenubarActionsButtonLink>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
