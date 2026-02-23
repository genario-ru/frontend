import { ChevronDownIcon, FilmIcon, LightbulbIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { ArchiveAppMenubarActionsButtonLink } from "./archive-app-menubar-actions-button";

export function ArchiveAppMenubarActions() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="accent" priority="primary" icon={<ChevronDownIcon />}>
          Создать
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <ArchiveAppMenubarActionsButtonLink
            priority="tertiary"
            icon={<LightbulbIcon />}
            to="/ideas-lists/settings"
          >
            Новые идеи
          </ArchiveAppMenubarActionsButtonLink>
          <ArchiveAppMenubarActionsButtonLink
            priority="tertiary"
            icon={<FilmIcon />}
            to="/scenarios/settings"
          >
            Новый сценарий
          </ArchiveAppMenubarActionsButtonLink>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
