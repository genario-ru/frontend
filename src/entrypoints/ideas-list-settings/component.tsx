import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { IdeasListSettings } from "@/widgets/ideas-list-settings/ideas-list-settings/components/ideas-list-settings";
import { IdeasListSettingsAppMenubar } from "@/widgets/ideas-list-settings/ideas-list-settings-app-menubar/components/ideas-list-settings-app-menubar";

export function IdeasListSettingsComponent() {
  const { templateId, ideasListId } = useSearch({
    from: "/_with-auth/_with-subscription/ideas-lists/settings",
  });

  return (
    <PageLayout className="h-fit min-h-full">
      <IdeasListSettingsAppMenubar ideasListId={ideasListId} />
      <IdeasListSettings templateId={templateId} ideasListId={ideasListId} />
    </PageLayout>
  );
}
