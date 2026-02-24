import type { ReactNode, RefObject } from "react";

import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

export type CardProps = PropsWithClassName & {
  title: ReactNode;
  description?: ReactNode;
  headerIcon?: ReactNode;
  headerActions?: ReactNode;
  children?: ReactNode;
  contentRef?: RefObject<HTMLDivElement | null>;
  footer?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
};

export function Card({
  title,
  description,
  headerIcon,
  headerActions,
  children,
  contentRef,
  footer,
  headerClassName,
  contentClassName,
  className,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "border-neutral-3 bg-neutral-1 group/card flex flex-col overflow-hidden rounded-2xl border",
        className,
      )}
      {...props}
    >
      <div
        data-slot="card-header"
        className={cn(
          "group/card-header border-neutral-3 @container/card-header flex min-h-[52px] items-center gap-2 border-b px-3",
          headerClassName,
        )}
      >
        {headerIcon}
        <div data-slot="card-title" className="font-medium">
          {title}
        </div>
        {headerActions && (
          <div
            data-slot="card-actions"
            className="ml-auto flex items-center gap-2"
          >
            {headerActions}
          </div>
        )}
      </div>
      {description && (
        <div
          data-slot="card-description"
          className="text-neutral-6 px-3 py-2 text-sm"
        >
          {description}
        </div>
      )}
      {children && (
        <div
          ref={contentRef}
          data-slot="card-content"
          className={cn("px-4 py-3", contentClassName)}
        >
          {children}
        </div>
      )}
      {footer && (
        <div data-slot="card-footer" className="flex items-center p-3">
          {footer}
        </div>
      )}
    </div>
  );
}
