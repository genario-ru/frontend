import { useMemo } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Heading } from "@/shared/components/ui/heading";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { formatTime } from "@/shared/utils/format-time";

type ScenarioChapterSceneHeaderProps = {
  name: string;
  startTime: number;
  endTime: number;
};

export function ScenarioChapterSceneHeader({
  name,
  startTime,
  endTime,
}: ScenarioChapterSceneHeaderProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <header className="flex items-center gap-2">
      <Heading variant="h3">{name}</Heading>
      <Badge size="sm" variant="tertiary">
        {time}
      </Badge>
    </header>
  );
}

export function ScenarioChapterSceneHeaderSkeleton() {
  return (
    <header className="flex items-center gap-2">
      <TextSkeleton fontSize={18} lineHeight={28} className="w-32" />
      <Skeleton className="h-7 w-20 rounded-xl" />
    </header>
  );
}
