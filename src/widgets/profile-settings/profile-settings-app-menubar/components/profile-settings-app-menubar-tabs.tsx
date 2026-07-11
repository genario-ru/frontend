import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { cn } from "@/shared/utils/cn";

import { useProfileSettingsAppMenubarTabs } from "../hooks/use-profile-settings-app-menubar-tabs";

type ProfileSettingsAppMenubarTabsProps = {
  profileId?: string;
  expand?: boolean;
};

export function ProfileSettingsAppMenubarTabs({
  profileId,
  expand = false,
}: ProfileSettingsAppMenubarTabsProps) {
  const { tabs, activeTab, handleTabClick } = useProfileSettingsAppMenubarTabs({
    profileId,
  });

  return (
    <RadioCardsGroup value={activeTab?.slug} onValueChange={handleTabClick}>
      {tabs.map((tab) => (
        <RadioCardsGroupItem
          key={tab.slug}
          size="sm"
          value={tab.slug}
          disabled={tab.disabled}
          className={cn({ "flex-1": expand })}
        >
          {tab.label}
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
