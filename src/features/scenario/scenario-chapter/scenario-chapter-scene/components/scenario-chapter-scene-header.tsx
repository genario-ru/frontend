import { useMemo } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Heading } from "@/shared/components/ui/heading";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { formatTime } from "@/shared/utils/format-time";

type ScenarioChapterSceneHeaderProps = {
  chapterPosition: number;
  position: number;
  name: string;
  startTime: number;
  endTime: number;
};

export function ScenarioChapterSceneHeader({
  chapterPosition,
  position,
  name,
  startTime,
  endTime,
}: ScenarioChapterSceneHeaderProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <header className="flex items-center gap-2">
      <Heading variant="h3">
        {chapterPosition}.{position}. {name}
      </Heading>
      <Badge size="sm" variant="tertiary" className="border-neutral-3 border">
        {time}
      </Badge>
    </header>
  );
}

export function ScenarioChapterSceneHeaderSkeleton() {
  return (
    <header className="flex items-center gap-2">
      <TextSkeleton fontSize={16} lineHeight={24} className="w-64" />
      <Skeleton className="rounded-2 h-6 w-24" />
    </header>
  );
}
