import { useMemo } from "react";

import { formatTime } from "@/shared/utils/format-time";

type ScenarioNavigationSceneProps = {
  chapterPosition: number;
  position: number;
  name: string;
  startTime: number;
  endTime: number;
};

export function ScenarioNavigationScene({
  chapterPosition,
  position,
  name,
  startTime,
  endTime,
}: ScenarioNavigationSceneProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-left text-sm font-semibold">
        {chapterPosition}.{position}. {name}
      </p>
      <p className="text-neutral-7 text-left text-xs">{time}</p>
    </div>
  );
}
