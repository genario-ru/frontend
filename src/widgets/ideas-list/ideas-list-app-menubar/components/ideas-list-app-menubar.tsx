import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

import { useIdeasListAppMenubar } from "../hooks/use-ideas-list-app-menubar";
import { IdeasListAppMenubarBadges } from "./ideas-list-app-menubar-badges";
import { IdeasListAppMenubarTabs } from "./ideas-list-app-menubar-tabs";
import { IdeasListMenubarActions } from "./ideas-list-menubar-actions";

type IdeasListAppMenubarParams = {
  ideasListId: string;
  changeParamsDialog: ReactNode;
};

export function IdeasListAppMenubar({
  ideasListId,
  changeParamsDialog,
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
        <div className="flex h-full flex-col items-end justify-between gap-8">
          <IdeasListMenubarActions
            ideasListId={ideasListId}
            changeParamsDialog={changeParamsDialog}
          />
          <IdeasListAppMenubarTabs ideasListId={ideasListId} />
        </div>
      }
    />
  );
}
