import { InfoIcon, LightbulbIcon } from "lucide-react";

import { ProfileSettingsSidebarBlock } from "@/features/profile-settings/profile-settings-sidebar-block/components/profile-settings-sidebar-block";

import {
  profileSettingsSidebarGeneralHints,
  profileSettingsSidebarGeneralReasons,
} from "../constants/profile-settings-general-sidebar-texts";

export function ProfileSettingsSidebarGeneral() {
  return (
    <aside className="flex min-w-0 flex-col gap-2">
      <ProfileSettingsSidebarBlock
        title="Зачем нужна эта информация?"
        icon={InfoIcon}
        items={profileSettingsSidebarGeneralReasons}
      />
      <ProfileSettingsSidebarBlock
        title="Подсказки"
        icon={LightbulbIcon}
        items={profileSettingsSidebarGeneralHints}
      />
    </aside>
  );
}
