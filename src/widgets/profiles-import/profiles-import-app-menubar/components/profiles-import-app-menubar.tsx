import { ArrowUpRightIcon } from "lucide-react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function ProfilesImportAppMenubar() {
  return (
    <AppMenubar
      actions={<BackButton />}
      title="Импорт каналов"
      right={
        <ButtonLink to="/profiles/settings" icon={<ArrowUpRightIcon />}>
          Создать профиль вручную
        </ButtonLink>
      }
    />
  );
}
