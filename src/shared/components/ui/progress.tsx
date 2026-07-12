import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
};

export function Progress({
  value,
  max = 100,
  className,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const currentValue = Math.min(value ?? 0, max);
  const validValue = currentValue / max;

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      className={cn(
        "bg-neutral-8/20 h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "bg-neutral-8 h-full w-full flex-1 rounded-full",
          indicatorClassName,
        )}
        style={{
          transform: `translateX(-${Math.ceil(100 - validValue * 100)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}
