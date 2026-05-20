import { cva, type VariantProps } from "class-variance-authority";
import {
  CircleCheckIcon,
  CircleMinusIcon,
  CircleXIcon,
  type LucideIcon as LucideIconType,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon } from "./lucide-icon";

const plugVariants = cva("group/plug w-full flex items-center justify-center", {
  variants: {
    appearance: {
      default: "",
      outlined: "border border-neutral-3 rounded-4",
    },
    direction: {
      column: "flex-col",
      row: "flex-row py-0",
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
      size: "base",
      className: "gap-1.5",
    },
    {
      direction: "column",
      size: "lg",
      className: "gap-2",
    },
    {
      direction: "row",
      size: "base",
      className: "gap-3",
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
      lg: "size-8",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "base",
  },
});

const plugTitleVariants = cva("whitespace-pre-line", {
  variants: {
    size: {
      base: "font-medium",
      lg: "font-medium text-lg",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const plugDescriptionVariants = cva(
  "text-neutral-7 text-center whitespace-pre-line",
  {
    variants: {
      size: {
        base: "text-sm max-w-md",
        lg: "text-base max-w-xl",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

const plugDefaultIconByVariant = {
  negative: CircleXIcon,
  positive: CircleCheckIcon,
  neutral: CircleMinusIcon,
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
    actions?: ReactNode;
  };

export function Plug({
  title,
  description,
  icon,
  variant = "neutral",
  actions,
  appearance,
  direction = "column",
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

  const textContent = (
    <div
      className={cn("flex flex-col", {
        "items-start": direction === "row",
        "items-center": direction === "column",
      })}
    >
      {titleEl}
      {descriptionEl}
    </div>
  );

  return (
    <div
      data-slot="plug"
      data-direction={direction}
      className={cn(plugVariants({ appearance, direction, size }), className)}
      {...props}
    >
      {iconEl}
      {textContent}
      {actions}
    </div>
  );
}
