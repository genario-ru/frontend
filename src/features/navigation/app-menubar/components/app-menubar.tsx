import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { memo, type ReactNode, useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

export type AppMenubarProps = PropsWithClassName<{
  title: ReactNode;
  description?: ReactNode;
  backButton?: boolean;
  sticky?: boolean;
  left?: ReactNode;
  right?: ReactNode;
}>;

export const AppMenubar = memo(
  ({
    title,
    description,
    backButton = false,
    sticky = true,
    left,
    right,
    className,
    ...props
  }: AppMenubarProps) => {
    const router = useRouter();
    const { isScrolled } = usePageCheckScroll();

    const onBackButtonClick = useCallback(() => {
      router.history.back();
    }, [router]);

    return (
      <Island
        as="header"
        roundedTop={false}
        row
        className={cn(
          "z-1 min-h-16 w-full shrink-0 gap-3 p-4 duration-200",
          {
            "shadow-bottom-1": isScrolled,
            "sticky top-0": sticky,
          },
          className,
        )}
        {...props}
      >
        <section className="flex flex-1 flex-col justify-between gap-4 overflow-hidden">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-1 items-center gap-2">
              {backButton && (
                <Button
                  variant="tertiary"
                  icon={<ArrowLeft />}
                  onClick={onBackButtonClick}
                />
              )}
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
