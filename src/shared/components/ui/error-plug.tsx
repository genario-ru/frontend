import { cva, type VariantProps } from "class-variance-authority";
import { CircleXIcon, type LucideIcon as LucideIconType } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon } from "./lucide-icon";

const errorPlugVariants = cva(
  "group/error-plug flex justify-center items-center",
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

export type ErrorPlugProps = ComponentProps<"div"> &
  VariantProps<typeof errorPlugVariants> & {
    title: string;
    description?: string;
    icon?: LucideIconType;
  };

export function ErrorPlug({
  title,
  description,
  icon: Icon = CircleXIcon,
  variant,
  direction,
  className,
  ...props
}: ErrorPlugProps) {
  const icon = (
    <LucideIcon
      data-slot="error-plug-icon"
      icon={Icon}
      className="stroke-negative-5 size-6"
    />
  );

  const titleEl = (
    <div data-slot="error-plug-title" className="font-medium">
      {title}
    </div>
  );

  const descriptionEl = description && (
    <div
      data-slot="error-plug-description"
      className="text-neutral-6 max-w-sm text-center text-sm leading-tight"
    >
      {description}
    </div>
  );

  return (
    <div
      data-slot="error-plug"
      data-direction={direction}
      className={cn(errorPlugVariants({ variant, direction }), className)}
      {...props}
    >
      {direction === "row" ? (
        <>
          {icon}
          <div className="flex flex-col">
            {titleEl}
            {descriptionEl}
          </div>
        </>
      ) : (
        <>
          {icon}
          {titleEl}
          {descriptionEl}
        </>
      )}
    </div>
  );
}
