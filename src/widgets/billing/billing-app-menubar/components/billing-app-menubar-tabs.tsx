import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { cn } from "@/shared/utils/cn";

import { useBillingAppMenubarTabs } from "../hooks/use-billing-app-menubar-tabs";

type BillingAppMenubarTabsParams = {
  expand?: boolean;
};

export function BillingAppMenubarTabs({
  expand = false,
}: BillingAppMenubarTabsParams) {
  const { tabs, activeTab, handleTabClick } = useBillingAppMenubarTabs();

  return (
    <RadioCardsGroup value={activeTab?.slug} onValueChange={handleTabClick}>
      {tabs.map((tab) => (
        <RadioCardsGroupItem
          key={tab.slug}
          size="sm"
          value={tab.slug}
          className={cn({ "flex-1": expand })}
        >
          {tab.label}
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
