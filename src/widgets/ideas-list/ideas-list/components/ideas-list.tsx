import { type PropsWithChildren, useMemo } from "react";

import { IdeasListIdeaCardSkeleton } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-skeleton";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import {
  EmptyPlug,
  EmptyPlugDescription,
  EmptyPlugIcon,
  EmptyPlugTitle,
} from "@/shared/components/ui/empty-plug";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";

import { useIdeasList } from "../hooks/use-ideas-list";
import { IdeasListIdeaCard } from "./ideas-list-idea-card";

type IdeasListProps = {
  ideasListId: string;
  tab: string | undefined;
};

export function IdeasList({ ideasListId, tab }: IdeasListProps) {
  const { ideasListData, isLoading, isError } = useIdeasList({
    ideasListId,
    tab,
  });

  const alert = useMemo(() => {
    if (ideasListData?.data.status === "generation") {
      return (
        <GenerationAlert
          title="Генерируем идеи"
          description="Генерируем для вас идеи видео, подождите несколько секунд..."
        />
      );
    }

    return null;
  }, [ideasListData]);

  const body = useMemo(() => {
    if (isError || ideasListData?.data.status === "failed") {
      return <IdeasListErrorPlug />;
    }

    if (isLoading || ideasListData?.data.status === "generation") {
      return <IdeasListSkeleton />;
    }

    if (!ideasListData?.data.ideas.length) {
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
  }, [ideasListData, isLoading, isError]);

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
      <ErrorPlug>
        <ErrorPlugIcon />
        <ErrorPlugTitle>Ошибка</ErrorPlugTitle>
        <ErrorPlugDescription>
          Произошла ошибка при загрузке списка идей
        </ErrorPlugDescription>
      </ErrorPlug>
    </Island>
  );
}

export function IdeasListEmptyPlug() {
  return (
    <Island className="w-full flex-1 items-center justify-center">
      <EmptyPlug>
        <EmptyPlugIcon />
        <EmptyPlugTitle>Нет идей</EmptyPlugTitle>
        <EmptyPlugDescription>В списке идей пока нет идей</EmptyPlugDescription>
      </EmptyPlug>
    </Island>
  );
}
