import { useMemo } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useIdeasList } from "../hooks/use-ideas-list";
import { IdeasListIdeaCard } from "./ideas-list-idea-card";

type IdeasListProps = {
  ideasListId: string;
  tab: string | undefined;
};

export function IdeasList({ ideasListId, tab }: IdeasListProps) {
  const { ideasListIdeasData, isIdeasListIdeasLoading } = useIdeasList({
    ideasListId,
    tab,
  });

  const body = useMemo(() => {
    if (isIdeasListIdeasLoading) {
      return <div>Loading...</div>;
    }

    if (!ideasListIdeasData) {
      return null;
    }

    if (!ideasListIdeasData.data.length) {
      return <div>No ideas found</div>;
    }

    return (
      <>
        {ideasListIdeasData.data.map((idea) => (
          <IdeasListIdeaCard
            key={idea.id}
            id={idea.id}
            name={idea.name}
            description={idea.description}
            saved={idea.saved}
          />
        ))}
      </>
    );
  }, [ideasListIdeasData, isIdeasListIdeasLoading]);

  return (
    <ContentLayout className="grid auto-rows-fr grid-cols-2 gap-4">
      {body}
    </ContentLayout>
  );
}
