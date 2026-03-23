import { HandIcon } from "lucide-react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function ProfilesImportAppMenubar() {
  return (
    <AppMenubar
      backButton
      title="Импорт каналов"
      right={
        <ButtonLink to="/profiles/settings" icon={<HandIcon />}>
          Создать профиль вручную
        </ButtonLink>
      }
    />
  );
}
