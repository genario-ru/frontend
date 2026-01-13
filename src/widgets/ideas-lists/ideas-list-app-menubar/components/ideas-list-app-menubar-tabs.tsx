import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";

import { useIdeasListAppMenubarTabs } from "../hooks/use-ideas-list-app-menubar-tabs";

type IdeasListAppMenubarTabsParams = {
  ideasListId: string;
};

export function IdeasListAppMenubarTabs({
  ideasListId,
}: IdeasListAppMenubarTabsParams) {
  const { tabs, activeTab, handleTabClick } = useIdeasListAppMenubarTabs({
    ideasListId,
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
