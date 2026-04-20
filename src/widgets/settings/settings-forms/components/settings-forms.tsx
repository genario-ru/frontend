import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";

import { SettingsChangeEmailForm } from "./settings-change-email-form";
import { SettingsChangeNameForm } from "./settings-change-name-form";
import { SettingsDeleteAccountForm } from "./settings-delete-account-form";
import { SettingsSignOutForm } from "./settings-sign-out-form";

export function SettingsForms() {
  return (
    <ContentLayout size="md" className="gap-2">
      <Island>
        <SettingsChangeNameForm />
        <SettingsChangeEmailForm />
      </Island>
      <Island>
        <SettingsSignOutForm />
        <SettingsDeleteAccountForm />
      </Island>
    </ContentLayout>
  );
}
