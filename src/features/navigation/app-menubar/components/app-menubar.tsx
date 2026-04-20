import { memo, type ReactNode } from "react";

import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

export type AppMenubarProps = PropsWithClassName<{
  actions?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  sticky?: boolean;
  left?: ReactNode;
  right?: ReactNode;
}>;

export const AppMenubar = memo(
  ({
    actions,
    title,
    description,
    sticky = true,
    left,
    right,
    className,
    ...props
  }: AppMenubarProps) => {
    const hasDescription = Boolean(description);
    const hasLeft = Boolean(left);
    const { isScrolled } = usePageCheckScroll();

    return (
      <Island
        as="header"
        row
        roundedTop={false}
        className={cn(
          "z-1 min-h-16 w-full shrink-0 gap-3 py-4 duration-200",
          {
            "shadow-bottom-1": isScrolled && sticky,
            "sticky top-0": sticky,
          },
          className,
        )}
        {...props}
      >
        <section
          className={cn(
            "flex flex-1 flex-col justify-between gap-4 overflow-hidden",
            {
              "justify-center": !hasLeft,
            },
          )}
        >
          <div
            className={cn("flex flex-1 flex-col justify-between gap-1", {
              "justify-center": !hasDescription && !hasLeft,
            })}
          >
            <div className="flex items-center gap-1">
              {actions}
              <Heading variant="h1" className="truncate">
                {title}
              </Heading>
            </div>
            {description && (
              <div className="text-neutral-7 line-clamp-2">{description}</div>
            )}
          </div>
          {left}
        </section>
        <section className="flex flex-col gap-3">{right}</section>
      </Island>
    );
  },
);

AppMenubar.displayName = "AppMenubar";
