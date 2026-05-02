import { ChevronDownIcon } from "lucide-react";
import { type ReactNode, type RefObject, useCallback, useState } from "react";

import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import { Button } from "./button";

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
  expandable?: boolean;
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
  expandable = false,
  ...props
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isContentVisible = !expandable || isExpanded;
  const hasHeaderActions = Boolean(headerActions || expandable);

  const handleExpandButtonClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

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
          "group/card-header border-neutral-3 @container/card-header flex min-h-[52px] items-center gap-2 px-3",
          { "border-b-transparent": isContentVisible },
          headerClassName,
        )}
      >
        {headerIcon}
        <div
          data-slot="card-title"
          className="overflow-hidden font-medium text-ellipsis whitespace-nowrap"
        >
          {title}
        </div>
        {hasHeaderActions && (
          <div
            data-slot="card-actions"
            className="ml-auto flex items-center gap-1"
          >
            {headerActions}
            {expandable && (
              <Button
                size="sm"
                priority="tertiary"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Свернуть" : "Развернуть"}
                icon={
                  <ChevronDownIcon
                    className={cn("transition-transform", {
                      "rotate-180": isExpanded,
                    })}
                  />
                }
                onClick={handleExpandButtonClick}
              />
            )}
          </div>
        )}
      </div>
      {isContentVisible && description && (
        <div
          data-slot="card-description"
          className="text-neutral-6 px-3 py-2 text-sm"
        >
          {description}
        </div>
      )}
      {isContentVisible && children && (
        <div
          ref={contentRef}
          data-slot="card-content"
          className={cn("px-4 py-3", contentClassName)}
        >
          {children}
        </div>
      )}
      {isContentVisible && footer && (
        <div data-slot="card-footer" className="flex items-center p-3">
          {footer}
        </div>
      )}
    </div>
  );
}
