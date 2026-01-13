import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

import { useIdeasListAppMenubar } from "../hooks/use-ideas-list-app-menubar";
import { IdeasListAppMenubarBadges } from "./ideas-list-app-menubar-badges";
import { IdeasListAppMenubarTabs } from "./ideas-list-app-menubar-tabs";
import { IdeasListMenubarActions } from "./ideas-list-menubar-actions";

type IdeasListAppMenubarParams = {
  ideasListId: string;
};

export function IdeasListAppMenubar({
  ideasListId,
}: IdeasListAppMenubarParams) {
  const { ideasListData, ideasListTitle, ideasListDescription } =
    useIdeasListAppMenubar({ ideasListId });

  return (
    <AppMenubar
      backButtonHref="/archive"
      title={ideasListTitle}
      description={ideasListDescription}
      left={<IdeasListAppMenubarBadges ideasListData={ideasListData} />}
      right={
        <div className="flex h-full flex-col justify-between gap-8">
          <IdeasListMenubarActions />
          <IdeasListAppMenubarTabs ideasListId={ideasListId} />
        </div>
      }
    />
  );
}
