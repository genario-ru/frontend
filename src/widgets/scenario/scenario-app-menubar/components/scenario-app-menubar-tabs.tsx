import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";

import { useScenarioAppMenubarTabs } from "../hooks/use-scenario-app-menubar-tabs";

type ScenarioAppMenubarTabsParams = {
  scenarioId: string;
};

export function ScenarioAppMenubarTabs({
  scenarioId,
}: ScenarioAppMenubarTabsParams) {
  const { tabs, activeTab, handleTabClick } = useScenarioAppMenubarTabs({
    scenarioId,
  });

  return (
    <RadioCardsGroup value={activeTab?.slug} onValueChange={handleTabClick}>
      {tabs.map((tab) => (
        <RadioCardsGroupItem key={tab.slug} size="sm" value={tab.slug}>
          {tab.name}
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
