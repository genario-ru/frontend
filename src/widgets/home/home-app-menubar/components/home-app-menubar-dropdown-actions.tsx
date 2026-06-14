import { BookImageIcon, ChevronDownIcon, LightbulbIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { HomeAppMenubarActionsButtonLink } from "./home-app-menubar-actions-button";

export function HomeAppMenubarDropdownActions() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button priority="primary" icon={<ChevronDownIcon />}>
          Создать
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <HomeAppMenubarActionsButtonLink
            icon={<LightbulbIcon />}
            to="/ideas-lists/settings"
          >
            Новые идеи
          </HomeAppMenubarActionsButtonLink>
          <HomeAppMenubarActionsButtonLink
            icon={<BookImageIcon />}
            to="/scenarios/settings"
          >
            Новый сценарий
          </HomeAppMenubarActionsButtonLink>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
