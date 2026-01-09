import { PageLayout } from "@/shared/components/layouts/page-layout";
import { AccountSettingsAppMenubar } from "@/widgets/account-settings/account-settings-app-menubar/components/account-settings-app-menubar";
import { AccountSettingsForms } from "@/widgets/account-settings/account-settings-forms/components/account-settings-forms";

export function AccountSettingsComponent() {
  return (
    <>
      <AccountSettingsAppMenubar />
      <PageLayout>
        <AccountSettingsForms />
      </PageLayout>
    </>
  );
}
