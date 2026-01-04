import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

export const ProfileCardSkeleton = () => {
  return (
    <Island className="gap-0 p-0">
      <header className="relative w-full p-2">
        <Skeleton className="rounded-3.5 h-16 w-full" />
        <Skeleton className="absolute -bottom-2 left-5 size-16 rounded-full ring-6" />
      </header>
      <div className="flex w-full flex-col gap-2 px-4 pb-4">
        <div className="flex w-full items-end gap-2">
          <TextSkeleton
            fontSize={20}
            lineHeight={28}
            linesCount={1}
            className="w-32"
          />
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>
        <TextSkeleton
          fontSize={16}
          lineHeight={24}
          linesCount={2}
          className="w-full"
        />
        <ItemsList
          count={4}
          gap={4}
          item={<Skeleton className="h-4 w-24 rounded-full" />}
        />
        <ItemsList
          count={4}
          gap={4}
          item={<Skeleton className="h-4 w-24 rounded-full" />}
        />
      </div>
    </Island>
  );
};
