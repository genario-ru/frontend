import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Progress = ({
  value,
  max = 100,
  className,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root>) => {
  const validValue = (value ?? 0) / max;

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
        className="bg-neutral-8 h-full w-full flex-1 rounded-full"
        style={{
          transform: `translateX(-${Math.ceil(100 - validValue * 100)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
};
