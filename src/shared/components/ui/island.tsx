import type { ComponentProps, ElementType } from "react";

import { cn } from "@/shared/utils/cn";

export type IslandProps = ComponentProps<"div"> & {
  title?: string;
  description?: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  grow?: boolean;
  row?: boolean;
  as?: ElementType;
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
  as: Comp = "div",
  className,
  children,
  ...props
}: IslandProps) => {
  const withHeader = Boolean(title || description);

  return (
    <Comp
      className={cn(
        "bg-neutral-1 flex w-full flex-col gap-5 p-5",
        {
          "rounded-t-5": roundedTop,
          "rounded-b-5": roundedBottom,
          "grow": grow,
          "flex-row": row,
        },
        className,
      )}
      {...props}
    >
      {withHeader && (
        <header className="flex flex-col gap-1">
          {title && (
            <h2 className="text-neutral-8 text-lg font-medium">{title}</h2>
          )}
          {description && (
            <p className="text-neutral-7 text-sm">{description}</p>
          )}
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
