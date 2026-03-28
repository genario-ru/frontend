import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";

import { SettingsChangeEmailForm } from "./settings-change-email-form";
import { SettingsChangeNameForm } from "./settings-change-name-form";
import { SettingsDeleteAccountForm } from "./settings-delete-account-form";

export function SettingsForms() {
  return (
    <ContentLayout size="md" className="gap-4">
      <Island>
        <SettingsChangeNameForm />
        <SettingsChangeEmailForm />
      </Island>
      <Island>
        <SettingsDeleteAccountForm />
      </Island>
    </ContentLayout>
  );
}
