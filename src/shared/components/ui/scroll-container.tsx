import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn";

type ScrollContainerProps = PropsWithChildren<{
  outerProps?: ComponentProps<"div">;
  innerProps?: ComponentProps<"div">;
}>;

export function ScrollContainer({
  outerProps: { className: outerClassName, ...outerProps } = {},
  innerProps: { className: innerClassName, ...innerProps } = {},
  children,
}: ScrollContainerProps) {
  return (
    <div
      className={cn("flex flex-col overflow-hidden", outerClassName)}
      {...outerProps}
    >
      <div
        className={cn("flex h-full flex-col overflow-auto", innerClassName)}
        {...innerProps}
      >
        {children}
      </div>
    </div>
  );
}
