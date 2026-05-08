import { useParams, useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { IdeasList } from "@/widgets/ideas-list/ideas-list/components/ideas-list";
import { IdeasListAppMenubar } from "@/widgets/ideas-list/ideas-list-app-menubar/components/ideas-list-app-menubar";

export function IdeasListComponent() {
  const { ideasListId } = useParams({
    from: "/_with-auth/_with-subscription/ideas-lists/$ideasListId",
  });

  const { tab } = useSearch({
    from: "/_with-auth/_with-subscription/ideas-lists/$ideasListId",
  });

  return (
    <PageLayout className="h-fit min-h-full pb-8">
      <IdeasListAppMenubar ideasListId={ideasListId} />
      <IdeasList ideasListId={ideasListId} tab={tab} />
    </PageLayout>
  );
}
