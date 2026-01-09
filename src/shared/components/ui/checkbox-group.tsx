import {
  Checkbox as CheckboxBase,
  type CheckboxRootProps,
} from "@base-ui/react/checkbox";
import {
  CheckboxGroup as CheckboxGroupBase,
  type CheckboxGroupProps,
} from "@base-ui/react/checkbox-group";
import { CheckIcon } from "lucide-react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import { LucideIcon } from "./lucide-icon";

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <CheckboxGroupBase
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    />
  );
}

export function CheckboxGroupItem({
  className,
  children,
  ...props
}: CheckboxRootProps) {
  return (
    <CheckboxBase.Root
      className={cn(
        buttonVariants({ size: "sm", variant: "tertiary" }),
        "[&_svg]:stroke-neutral-1 w-full justify-start px-2 [&_svg]:size-3",
        className,
      )}
      {...props}
    >
      <CheckboxBase.Indicator
        keepMounted={true}
        className="group data-checked:bg-neutral-8 bg-neutral-3 flex size-5 items-center justify-center rounded-md duration-200"
      >
        <LucideIcon
          size="sm"
          icon={CheckIcon}
          className="duration-200 group-data-unchecked:opacity-0"
        />
      </CheckboxBase.Indicator>
      {children}
    </CheckboxBase.Root>
  );
}
