import { BookImageIcon, LightbulbIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";
import { DrawerContent, DrawerHeader } from "@/shared/components/ui/drawer";
import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

type TemplateCardDrawerMenuProps = {
  templateId: string;
  templateName: string;
};

export function TemplateCardDrawerMenu({
  templateId,
  templateName,
}: TemplateCardDrawerMenuProps) {
  return (
    <DrawerContent>
      <DrawerHeader title={templateName} description="Что создадим?" />
      <Island roundedBottom={false} className="gap-2 p-2">
        <ButtonLink
          size="lg"
          to="/ideas-lists/settings"
          search={{ templateId }}
          icon={<LucideIcon icon={LightbulbIcon} />}
          iconPosition="left"
          className="w-full"
        >
          Новые идеи
        </ButtonLink>
        <ButtonLink
          size="lg"
          to="/scenarios/settings"
          search={{ templateId }}
          icon={<LucideIcon icon={BookImageIcon} />}
          iconPosition="left"
          className="w-full"
        >
          Новый сценарий
        </ButtonLink>
      </Island>
    </DrawerContent>
  );
}
