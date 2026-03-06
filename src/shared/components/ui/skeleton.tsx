import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export type SkeletonProps = ComponentProps<"div">;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      {...props}
      title="Загрузка..."
      className={cn("bg-neutral-3 animate-pulse", className)}
    />
  );
};
