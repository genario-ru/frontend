import * as Slot from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type BlockHeaderProps = ComponentProps<"header">;

type BlockContentProps = ComponentProps<"div"> & {
  direction?: "row" | "column";
  asChild?: boolean;
};

export const Block = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("flex h-fit w-full flex-col gap-4", className)}
    {...props}
  />
);

export const BlockHeader = ({ className, ...props }: BlockHeaderProps) => (
  <header
    className={cn("flex w-full flex-col gap-0.5 px-5", className)}
    {...props}
  />
);

export const BlockTitle = ({
  className,
  children,
  ...props
}: ComponentProps<"h2">) => (
  <h2 className={cn("text-xl font-semibold", className)} {...props}>
    {children}
  </h2>
);

export const BlockDescription = ({
  className,
  children,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("text-neutral-6", className)} {...props}>
    {children}
  </p>
);

export const BlockContent = ({
  direction = "column",
  asChild,
  className,
  ...props
}: BlockContentProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(
        "flex w-full gap-3 px-5",
        {
          "flex-row": direction === "row",
          "flex-col": direction === "column",
        },
        className,
      )}
      {...props}
    />
  );
};
