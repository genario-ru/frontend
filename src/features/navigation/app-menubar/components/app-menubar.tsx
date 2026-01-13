import type { NavigateOptions } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { memo, type ReactNode } from "react";

import { AppSidebarTrigger } from "@/features/navigation/app-sidebar/components/app-sidebar-trigger";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Island } from "@/shared/components/ui/island";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

export type AppMenubarProps = PropsWithClassName<{
  title: string;
  firstLine?: ReactNode;
  description?: ReactNode;
  backButtonHref?: NavigateOptions["to"];
  sticky?: boolean;
  left?: ReactNode;
  right?: ReactNode;
}>;

export const AppMenubar = memo(
  ({
    title,
    firstLine,
    description,
    backButtonHref,
    sticky = true,
    left,
    right,
    className,
    ...props
  }: AppMenubarProps) => {
    return (
      <Island
        as="header"
        roundedTop={false}
        row
        className={cn(
          "z-1 min-h-16 shrink-0 gap-3 p-4",
          {
            // TODO: add dynamic shadow
            "sticky top-0": sticky,
          },
          className,
        )}
        {...props}
      >
        <section className="flex flex-1 flex-col justify-center gap-3">
          <div className="flex items-center gap-2">
            <AppSidebarTrigger className="md:hidden" />
            {backButtonHref && (
              <ButtonLink
                to={backButtonHref}
                variant="tertiary"
                icon={<ArrowLeft />}
              />
            )}
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
            {firstLine}
          </div>
          {description && <p className="text-neutral-7">{description}</p>}
          {left}
        </section>
        <section className="flex flex-col gap-3">{right}</section>
      </Island>
    );
  },
);

AppMenubar.displayName = "AppMenubar";
