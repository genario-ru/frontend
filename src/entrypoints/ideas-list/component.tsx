import { useParams } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { IdeasListAppMenubar } from "@/widgets/ideas-lists/ideas-list-app-menubar/components/ideas-list-app-menubar";

export function IdeasListComponent() {
  const { ideasListId } = useParams({ from: "/_app/ideas-lists/$ideasListId" });

  return (
    <>
      <IdeasListAppMenubar ideasListId={ideasListId} />
      <PageLayout></PageLayout>
    </>
  );
}
