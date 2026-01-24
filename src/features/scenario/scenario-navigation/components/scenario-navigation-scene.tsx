import { type ComponentProps, useMemo } from "react";

import { cn } from "@/shared/utils/cn";
import { formatTime } from "@/shared/utils/format-time";

type ScenarioNavigationSceneProps = ComponentProps<"div"> & {
  size?: "sm" | "base";
  chapterPosition: number;
  position: number;
  name: string;
  startTime: number;
  endTime: number;
};

export function ScenarioNavigationScene({
  size = "base",
  chapterPosition,
  position,
  name,
  startTime,
  endTime,
  className,
  ...props
}: ScenarioNavigationSceneProps) {
  const time = useMemo(() => {
    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [startTime, endTime]);

  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <p className="text-left text-sm font-semibold whitespace-nowrap">
        {chapterPosition}.{position}. {name}
      </p>
      {size !== "sm" && (
        <p className="text-neutral-7 text-left text-xs whitespace-nowrap">
          {time}
        </p>
      )}
    </div>
  );
}
