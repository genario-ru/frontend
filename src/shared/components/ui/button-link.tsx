import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { isFunction } from "es-toolkit";
import type { ReactNode } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import type { PublicButtonVariantsProps } from "./button";

type ButtonLinkProps = LinkComponentProps &
  PublicButtonVariantsProps & {
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const ButtonLink = ({
  icon,
  iconPosition = "right",
  size,
  color,
  variant,
  state,
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
          size,
          color,
          variant,
          content: withChildren ? "mixed" : "icon",
          state,
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
