import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon as LucideIconType, ShredderIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon } from "./lucide-icon";

const emptyPlugVariants = cva(
  "group/empty-plug w-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border border-neutral-3 rounded-4",
      },
      direction: {
        column: "flex-col gap-1",
        row: "flex-row gap-2 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      direction: "column",
    },
  },
);

export type EmptyPlugProps = ComponentProps<"div"> &
  VariantProps<typeof emptyPlugVariants> & {
    title: string;
    description?: string;
    icon?: LucideIconType;
  };

export function EmptyPlug({
  title,
  description,
  icon = ShredderIcon,
  variant,
  direction,
  className,
  ...props
}: EmptyPlugProps) {
  const Icon = icon === undefined ? ShredderIcon : icon;

  const iconEl = (
    <LucideIcon data-slot="empty-plug-icon" icon={Icon} className="size-6" />
  );

  const titleEl = (
    <div data-slot="empty-plug-title" className="font-medium">
      {title}
    </div>
  );

  const descriptionEl = description && (
    <div
      data-slot="empty-plug-description"
      className="text-neutral-6 text-center text-sm"
    >
      {description}
    </div>
  );

  const content =
    direction === "row" ? (
      <>
        {iconEl}
        <div className="flex flex-col">
          {titleEl}
          {descriptionEl}
        </div>
      </>
    ) : (
      <>
        {iconEl}
        {titleEl}
        {descriptionEl}
      </>
    );

  return (
    <div
      data-slot="empty-plug"
      data-direction={direction}
      className={cn(emptyPlugVariants({ variant, direction }), className)}
      {...props}
    >
      {content}
    </div>
  );
}
