import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { IdeasListSettingsAppMenubar } from "@/widgets/ideas-list-settings/ideas-list-settings-app-menubar/components/ideas-list-settings-app-menubar";
import { IdeasListSettingsContent } from "@/widgets/ideas-list-settings/ideas-list-settings-content/components/ideas-list-settings-content";

export function IdeasListSettingsComponent() {
  const { ideasListId } = useSearch({ from: "/_app/ideas-lists/settings" });

  return (
    <>
      <IdeasListSettingsAppMenubar />
      <PageLayout className="flex-1">
        <IdeasListSettingsContent ideasListId={ideasListId} />
      </PageLayout>
    </>
  );
}
