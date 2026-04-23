import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import type { ButtonProps } from "./button";

type CheckboxChipsGroupProps = ComponentProps<"div">;

export type CheckboxChipsGroupItemProps = ComponentProps<
  typeof CheckboxPrimitive.Root
> &
  Pick<ButtonProps, "size" | "rounding">;

export const CheckboxChipsGroup = ({
  className,
  ...props
}: CheckboxChipsGroupProps) => {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
};

export const CheckboxChipsGroupItem = ({
  size,
  rounding,
  className,
  ...props
}: CheckboxChipsGroupItemProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        buttonVariants({ size, rounding }),
        "data-[state=checked]:ring-neutral-8 data-[state=checked]:ring-2",
        className,
      )}
      {...props}
    />
  );
};
