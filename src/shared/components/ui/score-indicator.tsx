import { cva, type VariantProps } from "class-variance-authority";

import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

const scoreSegment = cva(
  "flex h-8 flex-1 items-center justify-center rounded-lg text-sm font-medium",
  {
    variants: {
      zone: {
        positive: "bg-positive-5 text-white",
        warning: "bg-warning-5 text-white",
        negative: "bg-negative-5 text-white",
        inactive: "bg-neutral-2 text-neutral-6",
      },
    },
    defaultVariants: {
      zone: "inactive",
    },
  },
);

type ScoreZone = NonNullable<VariantProps<typeof scoreSegment>["zone"]>;

type ScoreIndicatorProps = PropsWithClassName<{
  value: number;
  max: number;
  inverted?: boolean;
}>;

export function ScoreIndicator({
  value,
  max,
  inverted = false,
  className,
}: ScoreIndicatorProps) {
  const segments = Array.from({ length: max }, (_, index) => index + 1);
  const valueZone = getValueZone(value, max, inverted);

  return (
    <div className={cn("flex w-full gap-1", className)}>
      {segments.map((segment) => (
        <div
          key={segment}
          className={scoreSegment({
            zone: segment <= value ? valueZone : "inactive",
          })}
        >
          {segment}
        </div>
      ))}
    </div>
  );
}

function getValueZone(
  value: number,
  max: number,
  inverted: boolean,
): ScoreZone {
  const ratio = value / max;

  if (ratio <= 0.4) {
    return inverted ? "negative" : "positive";
  }

  if (ratio <= 0.8) {
    return "warning";
  }

  return inverted ? "positive" : "negative";
}
