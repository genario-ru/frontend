import { useMemo } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Heading } from "@/shared/components/ui/heading";
import { formatTime } from "@/shared/utils/format-time";

type ScenarioChapterHeaderProps = {
  name: string | undefined;
  description: string | null | undefined;
  startTime: number;
  endTime: number;
};

export function ScenarioChapterHeader({
  name,
  startTime,
  endTime,
  description,
}: ScenarioChapterHeaderProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <header className="w-full gap-2">
      <div className="flex items-center gap-2">
        {name && <Heading variant="h2">{name}</Heading>}
        <Badge>{time}</Badge>
      </div>
      {description && <p className="text-neutral-7 text-sm">{description}</p>}
    </header>
  );
}
