import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { checkboxIconVariants } from "@/shared/constants/checkbox-icon-variants";
import { cn } from "@/shared/utils/cn";

const checkboxCardsGroupItemVariants = cva(
  cn(
    "group w-full bg-neutral-1 flex gap-3 rounded-xl p-4 border outline-none",
    "hover:border-neutral-6 active:border-neutral-6 hover:bg-neutral-2 active:bg-neutral-2",
    "focus-visible:ring-2 focus-visible:ring-neutral-12",
    "data-[state=checked]:border-neutral-12",
  ),
);

type CheckboxCardsGroupProps = ComponentProps<"div">;

type CheckboxCardsGroupItemProps = ComponentProps<
  typeof CheckboxPrimitive.Root
>;

export const CheckboxCardsGroup = ({
  className,
  ...props
}: CheckboxCardsGroupProps) => {
  return <div className={cn("flex w-full gap-2", className)} {...props} />;
};

export const CheckboxCardsGroupItem = ({
  children,
  className,
  ...props
}: CheckboxCardsGroupItemProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(checkboxCardsGroupItemVariants(), className)}
      {...props}
    >
      <div
        className={cn(
          "h-6 w-6 shrink-0 rounded-md border",
          "group-data-[state=checked]:bg-neutral-12 group-data-[state=checked]:border-neutral-12",
        )}
      >
        <CheckboxPrimitive.Indicator className="flex h-full w-full items-center justify-center">
          <CheckIcon className={checkboxIconVariants()} />
        </CheckboxPrimitive.Indicator>
      </div>
      {children}
    </CheckboxPrimitive.Root>
  );
};
