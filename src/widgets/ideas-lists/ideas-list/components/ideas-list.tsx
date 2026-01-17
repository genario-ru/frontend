import { useMemo } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useIdeasList } from "../hooks/use-ideas-list";
import { IdeasListIdeaCard } from "./ideas-list-idea-card";

type IdeasListProps = {
  ideasListId: string;
};

export function IdeasList({ ideasListId }: IdeasListProps) {
  const { ideasListIdeasData, isIdeasListIdeasLoading } = useIdeasList({
    ideasListId,
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
