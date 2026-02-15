import { type VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { badgeVariants } from "@/shared/constants/badge-variants";
import { cn } from "@/shared/utils/cn";

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    customColor?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const Badge = ({
  className,
  color,
  customColor,
  variant,
  size,
  icon,
  iconPosition = "left",
  style,
  children,
  ...props
}: BadgeProps) => (
  <div
    style={
      {
        "--badge-color": customColor,
        ...style,
      } as CSSProperties
    }
    className={cn(
      badgeVariants({ color, variant, size }),
      {
        "bg-(--badge-color)/10 text-(--badge-color) dark:bg-(--badge-color)/15 [&_svg]:stroke-(--badge-color)":
          customColor,
      },
      className,
    )}
    {...props}
  >
    {icon && iconPosition === "left" && icon}
    {children}
    {icon && iconPosition === "right" && icon}
  </div>
);
