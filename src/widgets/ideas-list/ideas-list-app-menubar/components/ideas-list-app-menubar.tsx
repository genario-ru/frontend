import { useMemo } from "react";

import { BadgesList } from "@/features/badges/badges-list/badges-list";
import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";
import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useIdeasListAppMenubar } from "../hooks/use-ideas-list-app-menubar";
import { IdeasListAppMenubarActions } from "./ideas-list-app-menubar-actions";
import { IdeasListAppMenubarTabs } from "./ideas-list-app-menubar-tabs";

type IdeasListAppMenubarParams = {
  ideasListId: string;
};

export function IdeasListAppMenubar({
  ideasListId,
}: IdeasListAppMenubarParams) {
  const {
    ideasListData,
    ideasListTitle,
    ideasListDescription,
    isIdeasListLoading,
  } = useIdeasListAppMenubar({ ideasListId });

  const title = useMemo(() => {
    if (isIdeasListLoading) {
      return <TextSkeleton fontSize={24} lineHeight={32} className="w-64" />;
    }

    return ideasListTitle;
  }, [ideasListTitle, isIdeasListLoading]);

  const description = useMemo(() => {
    if (isIdeasListLoading) {
      return <TextSkeleton fontSize={16} lineHeight={24} linesCount={2} />;
    }

    return ideasListDescription;
  }, [ideasListDescription, isIdeasListLoading]);

  const left = useMemo(() => {
    if (isIdeasListLoading) {
      return (
        <ItemsList
          row
          count={6}
          gap={4}
          item={<Skeleton className="rounded-2.5 h-8 w-24" />}
          className="flex-wrap"
        />
      );
    }

    return (
      <BadgesList
        badgesData={[
          ideasListData?.data.template,
          ideasListData?.data.videoTypes,
          ideasListData?.data.tones,
        ]}
      />
    );
  }, [ideasListData, isIdeasListLoading]);

  return (
    <AppMenubar
      actions={<BackButton />}
      title={title}
      description={description}
      left={left}
      right={
        <div className="flex h-full flex-col items-end justify-between gap-8">
          <IdeasListAppMenubarActions ideasListId={ideasListId} />
          <IdeasListAppMenubarTabs ideasListId={ideasListId} />
        </div>
      }
    />
  );
}
