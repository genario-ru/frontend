import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type CheckboxChipsGroupProps = ComponentProps<"div">;

type CheckboxChipsGroupItemProps = ComponentProps<
  typeof CheckboxPrimitive.Root
>;

export const CheckboxChipsGroup = ({
  className,
  ...props
}: CheckboxChipsGroupProps) => {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
};

export const CheckboxChipsGroupItem = ({
  className,
  ...props
}: CheckboxChipsGroupItemProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "rounded-4 min-h-12 w-fit shrink-0 px-5 py-2.5 font-medium duration-200 outline-none",
        "bg-neutral-2 hover:bg-neutral-3 active:bg-neutral-3",
        "focus-visible:ring-neutral-8 focus-visible:ring-2",
        "data-[state=checked]:ring-neutral-8 data-[state=checked]:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
