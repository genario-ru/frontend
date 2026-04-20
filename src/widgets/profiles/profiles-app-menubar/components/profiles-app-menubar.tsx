import { ImportIcon, PlusIcon } from "lucide-react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

export function ProfilesAppMenubar() {
  const { isMobile } = useBreakpoints();

  return (
    <AppMenubar
      actions={isMobile && <AppDrawer />}
      title="Профили"
      right={
        <div className="flex items-center gap-2">
          <ButtonLink to="/profiles/import" icon={<ImportIcon />}>
            Импорт каналов
          </ButtonLink>
          <ButtonLink
            priority="primary"
            icon={<PlusIcon />}
            to="/profiles/settings"
          >
            Новый профиль
          </ButtonLink>
        </div>
      }
    />
  );
}
