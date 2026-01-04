import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

interface IProps extends ComponentProps<"div"> {
  row?: boolean;
  count?: number;
  gap?: number;
  item: ReactNode;
}

const DEFAULT_ITEMS_COUNT = 3;

export function ItemsList({
  row,
  count = DEFAULT_ITEMS_COUNT,
  gap,
  item,
  className,
  ...props
}: IProps) {
  return (
    <div
      style={{ gap }}
      className={cn(
        "flex flex-col",
        {
          "flex-row": row,
        },
        className,
      )}
      {...props}
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div key={`items-list-${item?.toString()}-${index.toString()}`}>
          {item}
        </div>
      ))}
    </div>
  );
}
