import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { cn } from "@/shared/utils/cn";

import { useScenarioAppMenubarTabs } from "../hooks/use-scenario-app-menubar-tabs";

type ScenarioAppMenubarTabsParams = {
  scenarioId: string;
  expand?: boolean;
};

export function ScenarioAppMenubarTabs({
  scenarioId,
  expand = false,
}: ScenarioAppMenubarTabsParams) {
  const { tabs, activeTab, handleTabClick } = useScenarioAppMenubarTabs({
    scenarioId,
  });

  return (
    <RadioCardsGroup value={activeTab?.slug} onValueChange={handleTabClick}>
      {tabs.map((tab) => (
        <RadioCardsGroupItem
          key={tab.slug}
          size="sm"
          value={tab.slug}
          className={cn({ "flex-1": expand })}
        >
          {tab.name}
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
