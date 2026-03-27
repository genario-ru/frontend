import type { ComponentProps, ElementType, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { Heading } from "./heading";

export type IslandProps = ComponentProps<"div"> & {
  title?: string;
  description?: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  grow?: boolean;
  row?: boolean;
  noGap?: boolean;
  noPadding?: boolean;
  as?: ElementType;
  actions?: ReactNode;
};

export type IslandSectionProps = ComponentProps<"section"> & {
  title?: string;
  description?: string;
};

export const Island = ({
  title,
  description,
  roundedTop = true,
  roundedBottom = true,
  grow = false,
  row = false,
  noGap = false,
  noPadding = false,
  as: Comp = "div",
  actions,
  className,
  children,
  ...props
}: IslandProps) => {
  const withHeader = Boolean(title || description || actions);

  return (
    <Comp
      className={cn(
        "bg-neutral-1 flex w-full flex-col",
        {
          "rounded-t-5": roundedTop,
          "rounded-b-5": roundedBottom,
          "grow": grow,
          "flex-row": row,
          "p-5": !noPadding,
          "gap-4": !noGap,
        },
        className,
      )}
      {...props}
    >
      {withHeader && (
        <header className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            {title && <Heading variant="h2">{title}</Heading>}
            {description && <p className="text-neutral-7">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </Comp>
  );
};

export const IslandSection = ({
  title,
  description,
  className,
  children,
  ...props
}: IslandSectionProps) => {
  const withHeader = Boolean(title || description);

  return (
    <section className={cn("flex flex-col gap-3", className)} {...props}>
      {withHeader && (
        <header className="flex flex-col gap-1">
          {title && (
            <h3 className="text-neutral-8 text-lg font-medium">{title}</h3>
          )}
          {description && (
            <p className="text-neutral-7 text-sm">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
};
