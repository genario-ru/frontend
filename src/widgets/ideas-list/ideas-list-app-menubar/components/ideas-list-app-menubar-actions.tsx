import { IdeasListAppMenubarMoreActions } from "./ideas-list-app-menubar-more-actions";
import { IdeasListAppMenubarMoreIdeasDialog } from "./ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarActionsProps = {
  ideasListId: string;
};

export function IdeasListAppMenubarActions({
  ideasListId,
}: IdeasListAppMenubarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <IdeasListAppMenubarMoreIdeasDialog ideasListId={ideasListId} />
      <IdeasListAppMenubarMoreActions ideasListId={ideasListId} />
    </div>
  );
}
