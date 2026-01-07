import { type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { badgeVariants } from "@/shared/constants/badge-variants";
import { cn } from "@/shared/utils/cn";

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const Badge = ({
  className,
  color,
  variant,
  size,
  icon,
  iconPosition = "left",
  children,
  ...props
}: BadgeProps) => (
  <div
    className={cn(badgeVariants({ color, variant, size }), className)}
    {...props}
  >
    {icon && iconPosition === "left" && icon}
    {children}
    {icon && iconPosition === "right" && icon}
  </div>
);
