import { type PropsWithChildren, useMemo } from "react";

import { IdeasListIdeaCardSkeleton } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-skeleton";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { EmptyPlug } from "@/shared/components/ui/empty-plug";
import { ErrorPlug } from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

import { useIdeasList } from "../hooks/use-ideas-list";
import { IdeasListIdeaCard } from "./ideas-list-idea-card";

type IdeasListProps = {
  ideasListId: string;
  tab: string | undefined;
};

export function IdeasList({ ideasListId, tab }: IdeasListProps) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } = useIdeasList({
    ideasListId,
    tab,
  });

  const alert = useMemo(() => {
    if (checkIsGenerationStatus(ideasListData?.data.status)) {
      return (
        <GenerationAlert
          title="Генерируем идеи"
          description="Генерируем для вас идеи видео, подождите несколько секунд"
        />
      );
    }

    return null;
  }, [ideasListData]);

  const body = useMemo(() => {
    if (isIdeasListError || ideasListData?.data.status === "failed") {
      return <IdeasListErrorPlug />;
    }

    if (isIdeasListLoading) {
      return <IdeasListSkeleton />;
    }

    const ideasListStatus = ideasListData?.data.status;
    const ideasListLength = ideasListData?.data.ideas.length;

    if (checkIsGenerationStatus(ideasListStatus) && !ideasListLength) {
      return <IdeasListSkeleton />;
    }

    if (!ideasListLength) {
      return <IdeasListEmptyPlug />;
    }

    return (
      <IdeasListBodyLayout>
        {ideasListData.data.ideas.map((idea) => (
          <IdeasListIdeaCard
            key={idea.id}
            id={idea.id}
            name={idea.name}
            description={idea.description}
            saved={idea.saved}
          />
        ))}
      </IdeasListBodyLayout>
    );
  }, [ideasListData, isIdeasListLoading, isIdeasListError]);

  return (
    <ContentLayout className="flex-1 gap-4">
      {alert}
      {body}
    </ContentLayout>
  );
}

export function IdeasListBodyLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid w-full flex-1 auto-rows-fr grid-cols-2 gap-4">
      {children}
    </div>
  );
}

export function IdeasListSkeleton() {
  return (
    <IdeasListBodyLayout>
      <ItemsList
        noParent
        count={4}
        gap={16}
        item={<IdeasListIdeaCardSkeleton />}
      />
    </IdeasListBodyLayout>
  );
}

export function IdeasListErrorPlug() {
  return (
    <Island className="w-full flex-1 items-center justify-center">
      <ErrorPlug
        title="Ошибка"
        description="Произошла ошибка при загрузке списка идей"
      />
    </Island>
  );
}

export function IdeasListEmptyPlug() {
  return (
    <Island className="w-full flex-1 items-center justify-center">
      <EmptyPlug title="Нет идей" description="В списке идей пока нет идей" />
    </Island>
  );
}
