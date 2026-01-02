import { type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { badgeVariants } from "@/shared/constants/badge-variants";
import { cn } from "@/shared/utils/cn";

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({
  className,
  color,
  variant,
  size,
  ...props
}: BadgeProps) => (
  <div
    className={cn(badgeVariants({ color, variant, size }), className)}
    {...props}
  />
);
