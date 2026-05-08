import { PageLayout } from "@/shared/components/layouts/page-layout";
import { SettingsAppMenubar } from "@/widgets/settings/settings-app-menubar/components/settings-app-menubar";
import { SettingsForms } from "@/widgets/settings/settings-forms/components/settings-forms";

export function SettingsComponent() {
  return (
    <PageLayout className="h-fit min-h-full pb-8">
      <SettingsAppMenubar />
      <SettingsForms />
    </PageLayout>
  );
}
