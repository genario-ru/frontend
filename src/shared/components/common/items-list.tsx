import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

interface IProps extends ComponentProps<"div"> {
  row?: boolean;
  count?: number;
  gap?: number;
  item: ReactNode;
  noParent?: boolean;
}

const DEFAULT_ITEMS_COUNT = 3;

export function ItemsList({
  row,
  count = DEFAULT_ITEMS_COUNT,
  gap,
  item,
  noParent,
  className,
  ...props
}: IProps) {
  const skeletons = Array.from({
    length: count,
  }).map((_, index) => (
    <div key={`items-list-${item?.toString()}-${index.toString()}`}>{item}</div>
  ));

  if (noParent) {
    return <>{skeletons}</>;
  }

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
      {skeletons}
    </div>
  );
}
