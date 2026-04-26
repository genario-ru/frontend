import { BookImageIcon, LightbulbIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

import { TemplateCardMenuButtonLink } from "./template-card-menu-button-link";

type TemplateCardMenuProps = ComponentProps<"div"> & {
  templateId: string;
};

export function TemplateCardMenu({
  templateId,
  className,
  ...props
}: TemplateCardMenuProps) {
  return (
    <div
      className={cn(
        "rounded-4 bg-neutral-8/10 flex flex-col items-center justify-center gap-2 p-2 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <TemplateCardMenuButtonLink
        to="/ideas-lists/settings"
        search={{ templateId }}
        icon={<LucideIcon icon={LightbulbIcon} />}
        className="w-full flex-1"
      >
        Новые идеи
      </TemplateCardMenuButtonLink>
      <TemplateCardMenuButtonLink
        to="/scenarios/settings"
        search={{ templateId }}
        icon={<LucideIcon icon={BookImageIcon} />}
        className="w-full flex-1"
      >
        Новый сценарий
      </TemplateCardMenuButtonLink>
    </div>
  );
}
