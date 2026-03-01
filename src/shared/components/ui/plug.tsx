import { cva, type VariantProps } from "class-variance-authority";
import {
  CircleCheckIcon,
  CircleXIcon,
  type LucideIcon as LucideIconType,
  ShredderIcon,
} from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon } from "./lucide-icon";

const plugVariants = cva("group/plug w-full flex items-center justify-center", {
  variants: {
    appearance: {
      default: "",
      outlined: "border border-neutral-3 rounded-4",
    },
    direction: {
      column: "flex-col gap-1",
      row: "flex-row gap-2 py-0",
    },
    size: {
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    appearance: "default",
    direction: "column",
    size: "base",
  },
  compoundVariants: [
    {
      direction: "column",
      size: "lg",
      className: "gap-2",
    },
    {
      direction: "row",
      size: "lg",
      className: "gap-4",
    },
  ],
});

const plugIconVariants = cva("", {
  variants: {
    variant: {
      negative: "stroke-negative-5",
      positive: "stroke-positive-5",
      neutral: "stroke-neutral-8",
    },
    size: {
      base: "size-6",
      lg: "size-10",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "base",
  },
});

const plugTitleVariants = cva("", {
  variants: {
    size: {
      base: "font-medium",
      lg: "font-medium text-xl",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const plugDescriptionVariants = cva("text-neutral-6 text-center", {
  variants: {
    size: {
      base: "text-sm max-w-md",
      lg: "text-base max-w-2xl",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const plugDefaultIconByVariant = {
  negative: CircleXIcon,
  positive: CircleCheckIcon,
  neutral: ShredderIcon,
} as const;

type PlugVariant = NonNullable<
  VariantProps<typeof plugIconVariants>["variant"]
>;

export type PlugProps = ComponentProps<"div"> &
  VariantProps<typeof plugVariants> & {
    title: string;
    description?: string;
    icon?: LucideIconType;
    variant?: PlugVariant;
  };

export function Plug({
  title,
  description,
  icon,
  variant = "neutral",
  appearance,
  direction,
  size,
  className,
  ...props
}: PlugProps) {
  const resolvedSize = size ?? "base";
  const Icon = icon ?? plugDefaultIconByVariant[variant];

  const iconEl = (
    <LucideIcon
      data-slot="plug-icon"
      icon={Icon}
      className={plugIconVariants({ variant, size: resolvedSize })}
    />
  );

  const titleEl = (
    <div
      data-slot="plug-title"
      className={plugTitleVariants({ size: resolvedSize })}
    >
      {title}
    </div>
  );

  const descriptionEl = description && (
    <div
      data-slot="plug-description"
      className={plugDescriptionVariants({ size: resolvedSize })}
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
      data-slot="plug"
      data-direction={direction}
      className={cn(plugVariants({ appearance, direction, size }), className)}
      {...props}
    >
      {content}
    </div>
  );
}
