import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { IdeasListIdeaCardLayout } from "./ideas-list-idea-card-layout";

export function IdeasListIdeaCardSkeleton() {
  return (
    <IdeasListIdeaCardLayout
      name={<TextSkeleton fontSize={20} lineHeight={28} className="h-8 w-40" />}
      description={
        <TextSkeleton fontSize={14} lineHeight={20} linesCount={10} />
      }
      secondaryActions={<Skeleton className="rounded-3 h-8 w-8" />}
      primaryActions={
        <ItemsList
          row
          count={2}
          gap={8}
          item={<Skeleton className="rounded-3 h-10 w-32" />}
          className="justify-between"
        />
      }
    />
  );
}
