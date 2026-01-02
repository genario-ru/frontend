import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

export const Separator = ({
  ref,
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "bg-neutral-5 shrink-0",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className,
    )}
    {...props}
  />
);
