import { useRef } from "react";

import { IdeasListIdeaCardLayout } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-layout";

import { IdeasListIdeaCardPrimaryActions } from "./ideas-list-idea-card-primary-actions";
import { IdeasListIdeaCardSecondaryActions } from "./ideas-list-idea-card-secondary-actions";

type IdeasListCardProps = {
  id: string;
  name?: string | null;
  description?: string | null;
  reason?: string | null;
  saved: boolean;
};

export function IdeasListIdeaCard({
  id,
  name,
  description,
  reason,
  saved,
}: IdeasListCardProps) {
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <IdeasListIdeaCardLayout
      name={name}
      description={description}
      reason={reason}
      descriptionRef={descriptionRef}
      primaryActions={<IdeasListIdeaCardPrimaryActions ideaId={id} />}
      secondaryActions={
        <IdeasListIdeaCardSecondaryActions
          ideaId={id}
          initialSaved={saved}
          initialName={name}
          initialDescription={description}
          copyElementRef={descriptionRef}
        />
      }
    />
  );
}
