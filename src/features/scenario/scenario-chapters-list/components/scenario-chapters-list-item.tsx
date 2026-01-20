import { useMemo } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { formatTime } from "@/shared/utils/format-time";

type ScenarioChaptersListItemProps = {
  position: number;
  name: string;
  description: string | null;
  startTime: number;
  endTime: number;
};

export function ScenarioChaptersListItem({
  position,
  name,
  description,
  startTime,
  endTime,
}: ScenarioChaptersListItemProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-1.5">
        <p className="text-left font-medium">
          {position}. {name}
        </p>
        <Badge size="sm">{time}</Badge>
      </div>
      {description && (
        <p className="text-neutral-7 line-clamp-2 text-left text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
