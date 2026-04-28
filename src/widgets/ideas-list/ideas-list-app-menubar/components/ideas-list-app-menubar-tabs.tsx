import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { cn } from "@/shared/utils/cn";

import { useIdeasListAppMenubarTabs } from "../hooks/use-ideas-list-app-menubar-tabs";

type IdeasListAppMenubarTabsParams = {
  ideasListId: string;
  expand?: boolean;
};

export function IdeasListAppMenubarTabs({
  ideasListId,
  expand = false,
}: IdeasListAppMenubarTabsParams) {
  const { tabs, activeTab, handleTabClick } = useIdeasListAppMenubarTabs({
    ideasListId,
  });

  return (
    <RadioCardsGroup value={activeTab?.slug} onValueChange={handleTabClick}>
      {tabs.map((tab) => (
        <RadioCardsGroupItem
          key={tab.slug}
          size="sm"
          value={tab.slug}
          className={cn({
            "flex-1": expand,
          })}
        >
          {tab.name}
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
