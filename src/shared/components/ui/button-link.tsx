import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { isFunction } from "es-toolkit";
import type { CSSProperties } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import type { PublicButtonProps } from "./button";

export type ButtonLinkProps = LinkComponentProps &
  Omit<PublicButtonProps, "state">;

export const ButtonLink = ({
  icon,
  iconPosition = "right",
  iconColor,
  size,
  variant,
  priority,
  rounding,
  direction,
  align,
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  const withChildren = Boolean(children);
  const withIcon = Boolean(icon);
  const withIconColor = Boolean(iconColor);

  const style = {
    "--button-icon-color": iconColor,
  } as CSSProperties;

  return (
    <Link
      style={style}
      className={cn(
        buttonVariants({
          variant,
          priority,
          size,
          rounding,
          content: withChildren ? "mixed" : "icon",
          direction,
          align,
        }),
        {
          "[&_svg]:stroke-(--button-icon-color)!": withIconColor,
        },
        className,
      )}
      {...props}
    >
      {(linkProps: { isActive: boolean; isTransitioning: boolean }) => (
        <>
          {withIcon && iconPosition === "left" && icon}
          {isFunction(children) ? children(linkProps) : children}
          {withIcon && iconPosition === "right" && icon}
        </>
      )}
    </Link>
  );
};
