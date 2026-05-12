import { useIdeasListAppMenubarMoreActions } from "../hooks/use-ideas-list-app-menubar-more-actions";
import { IdeasListAppMenubarMoreActionsDrawer } from "./ideas-list-app-menubar-more-actions-drawer";
import { IdeasListAppMenubarMoreActionsDropdown } from "./ideas-list-app-menubar-more-actions-dropdown";

type IdeasListAppMenubarMoreActionsProps = {
  ideasListId: string;
  withMoreIdeasAction?: boolean;
};

export function IdeasListAppMenubarMoreActions({
  ideasListId,
  withMoreIdeasAction = false,
}: IdeasListAppMenubarMoreActionsProps) {
  const { isMobile } = useIdeasListAppMenubarMoreActions();

  if (isMobile) {
    return (
      <IdeasListAppMenubarMoreActionsDrawer
        ideasListId={ideasListId}
        withMoreIdeasAction={withMoreIdeasAction}
      />
    );
  }

  return (
    <IdeasListAppMenubarMoreActionsDropdown
      ideasListId={ideasListId}
      withMoreIdeasAction={withMoreIdeasAction}
    />
  );
}
