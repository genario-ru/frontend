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
        items={profileSettingsSidebarGeneralReasons}
      />
      <ProfileSettingsSidebarBlock
        title="Подсказки"
        items={profileSettingsSidebarGeneralHints}
      />
    </aside>
  );
}
