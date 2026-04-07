import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";

import { useBillingAppMenubarTabs } from "../hooks/use-billing-app-menubar-tabs";

export function BillingAppMenubarTabs() {
  const { tabs, activeTab, handleTabClick } = useBillingAppMenubarTabs();

  return (
    <RadioCardsGroup value={activeTab?.slug} onValueChange={handleTabClick}>
      {tabs.map((tab) => (
        <RadioCardsGroupItem key={tab.slug} size="sm" value={tab.slug}>
          {tab.label}
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
