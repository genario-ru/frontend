import { FilmIcon, LightbulbIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

import { TemplateCardMenuButton } from "./template-card-menu-button";

type TemplateCardMenuProps = ComponentProps<"div"> & {
  onCreateIdeasButtonClick: () => void;
  onCreateScenarioButtonClick: () => void;
};

export function TemplateCardMenu({
  onCreateIdeasButtonClick,
  onCreateScenarioButtonClick,
  className,
  ...props
}: TemplateCardMenuProps) {
  return (
    <div
      className={cn(
        "rounded-4 bg-neutral-8/10 flex flex-col items-center justify-center gap-2 p-4 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <TemplateCardMenuButton
        icon={<LucideIcon icon={LightbulbIcon} />}
        onClick={onCreateIdeasButtonClick}
      >
        Новые идеи
      </TemplateCardMenuButton>
      <TemplateCardMenuButton
        icon={<LucideIcon icon={FilmIcon} />}
        onClick={onCreateScenarioButtonClick}
      >
        Новый сценарий
      </TemplateCardMenuButton>
    </div>
  );
}
