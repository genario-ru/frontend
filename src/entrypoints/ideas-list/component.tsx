import { useParams } from "@tanstack/react-router";
import { PencilIcon } from "lucide-react";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Button } from "@/shared/components/ui/button";
import { IdeasList } from "@/widgets/ideas-list/ideas-list/components/ideas-list";
import { IdeasListAppMenubar } from "@/widgets/ideas-list/ideas-list-app-menubar/components/ideas-list-app-menubar";
import { IdeasListDialog } from "@/widgets/ideas-list/ideas-list-dialog/components/ideas-list-dialog";

export function IdeasListComponent() {
  const { ideasListId } = useParams({ from: "/_app/ideas-lists/$ideasListId" });

  return (
    <>
      <IdeasListAppMenubar
        ideasListId={ideasListId}
        changeParamsDialog={
          <IdeasListDialog
            ideasListId={ideasListId}
            trigger={
              <Button size="sm" icon={<PencilIcon />}>
                Изменить параметры
              </Button>
            }
          />
        }
      />
      <PageLayout>
        <IdeasList ideasListId={ideasListId} />
      </PageLayout>
    </>
  );
}
