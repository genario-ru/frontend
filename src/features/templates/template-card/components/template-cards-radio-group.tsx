import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentProps } from "react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

import { TemplateCard } from "./template-card";

type TemplateCardsRadioGroupItemProps = ComponentProps<
  typeof RadioGroupPrimitive.Item
> & {
  icon?: string | null;
  color?: string | null;
  name: string;
  description?: string | null;
};

type TemplateCardsRadioGroupSkeletonProps = {
  count?: number;
};

export const TemplateCardsRadioGroup = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid w-full auto-rows-fr grid-cols-2 gap-3", className)}
      {...props}
    />
  );
};

export const TemplateCardsRadioGroupItem = ({
  icon,
  color,
  name,
  description,
  checked,
  disabled,
  ...props
}: TemplateCardsRadioGroupItemProps) => {
  return (
    <RadioGroupPrimitive.Item {...props} asChild>
      <TemplateCard
        icon={icon}
        title={name}
        description={description}
        color={color}
        active={checked}
        clickable={!disabled}
      />
    </RadioGroupPrimitive.Item>
  );
};

export function TemplateCardsRadioGroupSkeleton({
  count = 6,
}: TemplateCardsRadioGroupSkeletonProps) {
  return (
    <ItemsList
      count={count}
      item={<TemplateCardsRadioGroupItemSkeleton />}
      className="grid w-full auto-rows-fr grid-cols-2 gap-3"
    />
  );
}

export function TemplateCardsRadioGroupItemSkeleton() {
  return <Skeleton className="rounded-4 h-[132px] flex-1" />;
}
