import type { ReactNode } from "react";

import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

type ItemProps = PropsWithClassName<{
  title: ReactNode;
  description?: ReactNode;
  badges?: ReactNode;
  icon?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
}>;

export function Item({
  title,
  description,
  badges,
  icon,
  left,
  right,
  bottom,
  className,
}: ItemProps) {
  return (
    <div
      className={cn(
        "bg-neutral-2 rounded-4 flex flex-col gap-3 p-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {left}
        <section className="flex flex-1 flex-col gap-1">
          <div className="flex w-full items-center gap-2">
            {icon}
            <div className="w-full font-medium">{title}</div>
          </div>
          {description && (
            <div className="text-neutral-7 text-sm">{description}</div>
          )}
          {badges}
        </section>
        {right}
      </div>
      {bottom}
    </div>
  );
}
