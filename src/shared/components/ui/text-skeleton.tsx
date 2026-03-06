import { type ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { Skeleton } from "./skeleton";

type TextSkeletonProps = ComponentProps<typeof Skeleton> & {
  fontSize: number;
  lineHeight: number;
  linesCount?: number;
  lineClassName?: string;
};

export const TextSkeleton = ({
  fontSize,
  lineHeight,
  linesCount = 1,
  lineClassName,
  className,
  ...props
}: TextSkeletonProps) => {
  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      {Array.from({ length: linesCount }).map((_, index) => (
        <div
          key={index}
          style={{ height: `${lineHeight}px` }}
          className="flex w-full items-center"
        >
          <Skeleton
            style={{ height: `${fontSize}px` }}
            className={cn(
              "rounded-full",
              {
                "w-full": index % 3 === 0,
                "w-[85%] lg:w-[90%]": index % 3 === 1,
                "w-[90%] lg:w-[95%]": index % 3 === 2,
              },
              lineClassName,
            )}
          />
        </div>
      ))}
    </div>
  );
};
