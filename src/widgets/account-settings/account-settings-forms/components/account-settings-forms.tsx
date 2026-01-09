import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";

import { AccountSettingsChangeNameForm } from "./account-settings-change-name-form";
import { AccountSettingsDeleteAccountForm } from "./account-settings-delete-account-form";

export function AccountSettingsForms() {
  return (
    <ContentLayout size="md" className="gap-4">
      <Island>
        <AccountSettingsChangeNameForm />
        {/* {emailVerified ? (
          <ChangeEmailForm />
        ) : (
          <ResendVerificationEmailForm currentEmail={email} />
        )} */}
      </Island>
      <Island>
        <AccountSettingsDeleteAccountForm />
      </Island>
    </ContentLayout>
  );
}
