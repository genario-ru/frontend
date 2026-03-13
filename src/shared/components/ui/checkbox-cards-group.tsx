import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { checkboxIconVariants } from "@/shared/constants/checkbox-icon-variants";
import { cn } from "@/shared/utils/cn";

const checkboxCardsGroupItemVariants = cva(
  cn(
    "group w-full bg-neutral-1 flex gap-3 rounded-xl p-4 ring duration-200 ring-neutral-4 outline-none",
    "hover:bg-neutral-2 active:bg-neutral-2 focus-visible:bg-neutral-2",
    "data-[state=checked]:ring-neutral-8 data-[state=checked]:ring-2",
  ),
  {
    variants: {
      state: {
        default: "",
        error: "ring-2 ring-negative-6",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

type CheckboxCardsGroupProps = ComponentProps<"div">;

type CheckboxCardsGroupItemProps = ComponentProps<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof checkboxCardsGroupItemVariants>;

export const CheckboxCardsGroup = ({
  className,
  ...props
}: CheckboxCardsGroupProps) => {
  return <div className={cn("flex w-full gap-2", className)} {...props} />;
};

export const CheckboxCardsGroupItem = ({
  state,
  children,
  className,
  ...props
}: CheckboxCardsGroupItemProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(checkboxCardsGroupItemVariants({ state }), className)}
      {...props}
    >
      <div
        className={cn(
          "ring-neutral-4 h-6 w-6 shrink-0 rounded-md ring",
          "group-data-[state=checked]:bg-neutral-8 group-data-[state=checked]:ring-neutral-8",
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
