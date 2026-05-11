import { BookImageIcon, LightbulbIcon } from "lucide-react";

import {
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import { TemplateCardMenuButtonLink } from "./template-card-menu-button-link";

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
      <DrawerSection roundedBottom={false}>
        <TemplateCardMenuButtonLink
          size="lg"
          align="start"
          to="/ideas-lists/settings"
          search={{ templateId }}
          icon={<LucideIcon icon={LightbulbIcon} />}
          iconPosition="left"
          className="w-full"
        >
          Новые идеи
        </TemplateCardMenuButtonLink>
        <TemplateCardMenuButtonLink
          size="lg"
          align="start"
          to="/scenarios/settings"
          search={{ templateId }}
          icon={<LucideIcon icon={BookImageIcon} />}
          iconPosition="left"
          className="w-full"
        >
          Новый сценарий
        </TemplateCardMenuButtonLink>
      </DrawerSection>
    </DrawerContent>
  );
}
