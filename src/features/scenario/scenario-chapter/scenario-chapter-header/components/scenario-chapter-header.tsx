import { useMemo } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { formatTime } from "@/shared/utils/format-time";

type ScenarioChapterHeaderProps = {
  position: number;
  name: string | undefined;
  description: string | null | undefined;
  startTime: number;
  endTime: number;
};

export function ScenarioChapterHeader({
  position,
  name,
  startTime,
  endTime,
  description,
}: ScenarioChapterHeaderProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <Island roundedBottom={false} className="w-full gap-2 pb-0">
      <div className="flex items-center gap-2">
        {name && (
          <Heading variant="h2">
            {position}. {name}
          </Heading>
        )}
        <Badge>{time}</Badge>
      </div>
      {description && <p className="text-neutral-7 text-sm">{description}</p>}
    </Island>
  );
}

export function ScenarioChapterHeaderSkeleton() {
  return (
    <Island roundedBottom={false} className="w-full gap-2 pb-0">
      <div className="flex items-center gap-2">
        <TextSkeleton
          fontSize={20}
          lineHeight={28}
          linesCount={1}
          className="w-32"
        />
        <Skeleton className="rounded-2.5 h-[30px] w-20" />
      </div>
      <TextSkeleton fontSize={14} lineHeight={20} className="w-4/5" />
    </Island>
  );
}
