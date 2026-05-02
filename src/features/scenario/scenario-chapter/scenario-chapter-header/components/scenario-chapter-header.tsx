import type { ReactNode } from "react";
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
  status?: ReactNode;
};

export function ScenarioChapterHeader({
  position,
  name,
  startTime,
  endTime,
  description,
  status,
}: ScenarioChapterHeaderProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <Island roundedBottom={false} className="w-full gap-2 pb-0">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        {name && (
          <Heading variant="h2">
            {position}. {name}
          </Heading>
        )}
        <div className="flex items-center gap-2">
          <Badge>{time}</Badge>
          {status}
        </div>
      </div>
      {description && <p className="text-neutral-7">{description}</p>}
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
        <Skeleton className="rounded-2.5 h-8 w-20" />
      </div>
      <TextSkeleton linesCount={2} fontSize={14} lineHeight={20} />
    </Island>
  );
}
