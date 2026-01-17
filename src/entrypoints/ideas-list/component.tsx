import { useParams, useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { IdeasList } from "@/widgets/ideas-list/ideas-list/components/ideas-list";
import { IdeasListAppMenubar } from "@/widgets/ideas-list/ideas-list-app-menubar/components/ideas-list-app-menubar";

export function IdeasListComponent() {
  const { ideasListId } = useParams({ from: "/_app/ideas-lists/$ideasListId" });
  const { tab } = useSearch({ from: "/_app/ideas-lists/$ideasListId" });

  return (
    <>
      <IdeasListAppMenubar ideasListId={ideasListId} />
      <PageLayout>
        <IdeasList ideasListId={ideasListId} tab={tab} />
      </PageLayout>
    </>
  );
}
