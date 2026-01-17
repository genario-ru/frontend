import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { IdeasListSettings } from "@/widgets/ideas-list-settings/ideas-list-settings/components/ideas-list-settings";
import { IdeasListSettingsAppMenubar } from "@/widgets/ideas-list-settings/ideas-list-settings-app-menubar/components/ideas-list-settings-app-menubar";

export function IdeasListSettingsComponent() {
  const { ideasListId } = useSearch({ from: "/_app/ideas-lists/settings" });

  return (
    <>
      <IdeasListSettingsAppMenubar />
      <PageLayout className="flex-1">
        <IdeasListSettings ideasListId={ideasListId} />
      </PageLayout>
    </>
  );
}
