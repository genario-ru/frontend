import type { ReactNode } from "react";

import type { PropsWithClassName } from "@/shared/types/props-with-classname";

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
}: ItemProps) {
  return (
    <div className="bg-neutral-2 rounded-4 flex flex-col gap-3 p-3">
      <div className="flex gap-3">
        {left}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex w-full items-center gap-2">
            {icon}
            <p className="w-full font-medium">{title}</p>
          </div>
          {description && (
            <p className="text-neutral-7 text-sm">{description}</p>
          )}
          {badges}
        </div>
        {right}
      </div>
      {bottom}
    </div>
  );
}
