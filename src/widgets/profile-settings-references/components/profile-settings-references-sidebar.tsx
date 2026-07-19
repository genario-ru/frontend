import { BarChartIcon, InfoIcon, LightbulbIcon } from "lucide-react";
import { useMemo } from "react";

import { ProfileSettingsSidebarBlock } from "@/features/profile-settings/profile-settings-sidebar-block/components/profile-settings-sidebar-block";
import { ProfileSettingsReferenceProgressItem } from "@/features/profile-settings-references/profile-settings-reference-progress-item/components/profile-settings-reference-progress-item";
import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { profileSettingsReferenceTargetCount } from "../constants/profile-settings-reference-progress";
import { profileSettingsReferenceSections } from "../constants/profile-settings-reference-sections";
import {
  profileSettingsSidebarReferencesHints,
  profileSettingsSidebarReferencesReasons,
} from "../constants/profile-settings-references-sidebar-texts";
import type { ProfileSettingsReferencesCounts } from "../types/profile-settings-references-counts";

type ProfileSettingsReferencesSidebarProps = {
  referencesCounts: ProfileSettingsReferencesCounts;
};

export function ProfileSettingsReferencesSidebar({
  referencesCounts,
}: ProfileSettingsReferencesSidebarProps) {
  const title = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        <span>Прогресс заполнения</span>
      </div>
    );
  }, []);

  return (
    <aside className="flex min-w-0 flex-col gap-2">
      <Island
        title={
          <div className="flex items-center gap-2">
            <LucideIcon size="sm" icon={BarChartIcon} />
            <span>{title}</span>
          </div>
        }
      >
        {profileSettingsReferenceSections.map((section) => (
          <ProfileSettingsReferenceProgressItem
            key={section.key}
            title={section.title}
            count={referencesCounts[section.key]}
            targetCount={profileSettingsReferenceTargetCount}
          />
        ))}
      </Island>
      <ProfileSettingsSidebarBlock
        title="Зачем нужны референсы?"
        icon={InfoIcon}
        items={profileSettingsSidebarReferencesReasons}
      />
      <ProfileSettingsSidebarBlock
        title="Подсказки"
        icon={LightbulbIcon}
        items={profileSettingsSidebarReferencesHints}
      />
    </aside>
  );
}

export function ProfileSettingsReferencesSidebarSkeleton() {
  return (
    <aside className="flex min-w-0 flex-col gap-2">
      <Island className="gap-4">
        <TextSkeleton fontSize={18} lineHeight={28} className="w-40" />
        <div className="flex flex-col gap-4">
          {profileSettingsReferenceSections.map((section) => (
            <div key={section.key} className="flex flex-col gap-2">
              <TextSkeleton fontSize={16} lineHeight={24} className="w-32" />
              <Skeleton className="rounded-4 h-2 w-full" />
            </div>
          ))}
        </div>
      </Island>
    </aside>
  );
}
