import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { isFunction } from "es-toolkit";
import type { ReactNode } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import type { PublicButtonVariantsProps } from "./button";

export type ButtonLinkProps = LinkComponentProps &
  Omit<PublicButtonVariantsProps, "state"> & {
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const ButtonLink = ({
  icon,
  iconPosition = "right",
  size,
  variant,
  priority,
  rounding,
  direction,
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  const withChildren = Boolean(children);
  const withIcon = Boolean(icon);

  return (
    <Link
      className={cn(
        buttonVariants({
          variant,
          priority,
          size,
          rounding,
          content: withChildren ? "mixed" : "icon",
          direction,
        }),
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
