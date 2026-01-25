import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

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
      "border-neutral-3 shrink-0",
      orientation === "horizontal" ? "w-full border-b" : "w-px border-r",
      className,
    )}
    {...props}
  />
);
