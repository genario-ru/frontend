import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

export const ProfileCardSkeleton = () => {
  return (
    <Island className="gap-0 p-0">
      <header className="relative w-full p-2">
        <Skeleton className="rounded-3.5 h-16 w-full" />
        <div className="ring-neutral-1 bg-neutral-1 absolute -bottom-2 left-5 rounded-full ring-6">
          <Skeleton className="size-10 rounded-full" />
        </div>
      </header>
      <div className="flex w-full flex-col gap-2 px-4 pb-4">
        <div className="flex w-full items-end justify-between gap-2">
          <div className="flex items-center gap-2">
            <TextSkeleton
              fontSize={20}
              lineHeight={28}
              linesCount={1}
              className="w-32"
            />
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>
          <Skeleton className="size-10 rounded-xl" />
        </div>
        <TextSkeleton
          fontSize={16}
          lineHeight={24}
          linesCount={2}
          className="w-full"
        />
        <ItemsList
          row={true}
          count={4}
          gap={4}
          item={<Skeleton className="h-6 w-24 rounded-lg" />}
        />
        <ItemsList
          row={true}
          count={4}
          gap={4}
          item={<Skeleton className="h-6 w-16 rounded-lg" />}
        />
      </div>
    </Island>
  );
};
