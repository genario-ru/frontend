import { type PropsWithChildren, useMemo } from "react";

import {
  IdeasListIdeaCardLayout,
  IdeasListIdeaCardLayoutSkeleton,
} from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-layout";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { SwipeActions } from "@/shared/components/ui/swipe-actions";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

import { useIdeasList } from "../hooks/use-ideas-list";
import { IdeasListIdeaCardPrimaryActions } from "./ideas-list-idea-card-primary-actions";
import { IdeasListIdeaCardSecondaryActions } from "./ideas-list-idea-card-secondary-actions";
import { IdeasListIdeaCardSwipeActions } from "./ideas-list-idea-card-swipe-actions";

type IdeasListProps = {
  ideasListId: string;
  tab: string | undefined;
};

export function IdeasList({ ideasListId, tab }: IdeasListProps) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } = useIdeasList({
    ideasListId,
    tab,
  });

  const { isMobile } = useBreakpoints();
  const showSwipeActions = isMobile && checkTouchScreen();

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
        {ideasListData.data.ideas.map((idea) => {
          if (showSwipeActions) {
            return (
              <SwipeActions
                key={idea.id}
                beforeInset={8}
                afterInset={8}
                actions={
                  <IdeasListIdeaCardSwipeActions
                    ideaId={idea.id}
                    initialSaved={idea.saved}
                    initialName={idea.name}
                    initialDescription={idea.description}
                  />
                }
              >
                <IdeasListIdeaCardLayout
                  className="h-full"
                  name={idea.name}
                  description={idea.description}
                  reason={idea.reason}
                  hook={idea.hook}
                  potential={idea.potential}
                  complexity={idea.complexity}
                  primaryActions={
                    <IdeasListIdeaCardPrimaryActions ideaId={idea.id} />
                  }
                />
              </SwipeActions>
            );
          }

          return (
            <IdeasListIdeaCardLayout
              key={idea.id}
              name={idea.name}
              description={idea.description}
              reason={idea.reason}
              hook={idea.hook}
              potential={idea.potential}
              complexity={idea.complexity}
              primaryActions={
                <IdeasListIdeaCardPrimaryActions ideaId={idea.id} />
              }
              secondaryActions={
                <IdeasListIdeaCardSecondaryActions
                  ideaId={idea.id}
                  initialSaved={idea.saved}
                  initialName={idea.name}
                  initialDescription={idea.description}
                />
              }
            />
          );
        })}
      </IdeasListBodyLayout>
    );
  }, [ideasListData, isIdeasListLoading, isIdeasListError, showSwipeActions]);

  return (
    <ContentLayout className="flex-1">
      {alert}
      {body}
    </ContentLayout>
  );
}

export function IdeasListBodyLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid w-full flex-1 auto-rows-fr gap-2 lg:grid-cols-2">
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
        item={<IdeasListIdeaCardLayoutSkeleton />}
      />
    </IdeasListBodyLayout>
  );
}

export function IdeasListErrorPlug() {
  return (
    <Island className="w-full flex-1 items-center justify-center">
      <Plug
        variant="negative"
        title="Ошибка"
        description="Произошла ошибка при загрузке списка идей"
      />
    </Island>
  );
}

export function IdeasListEmptyPlug() {
  return (
    <Island className="w-full flex-1 items-center justify-center">
      <Plug title="Нет идей" description="В списке идей пока нет идей" />
    </Island>
  );
}
