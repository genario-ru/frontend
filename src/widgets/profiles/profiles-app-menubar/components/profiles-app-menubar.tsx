import { PlusIcon } from "lucide-react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function ProfilesAppMenubar() {
  return (
    <AppMenubar
      title="Профили"
      right={
        <ButtonLink
          priority="primary"
          icon={<PlusIcon />}
          to="/profiles/settings"
        >
          Новый профиль
        </ButtonLink>
      }
    />
  );
}
