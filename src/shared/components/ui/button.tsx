import { type VariantProps } from "class-variance-authority";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import { Spinner } from "./spinner";

export type PublicButtonProps = Omit<
  VariantProps<typeof buttonVariants>,
  "content"
> & {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconColor?: string | null;
};

export type ButtonProps = ComponentProps<"button"> & PublicButtonProps;

export const Button = ({
  icon,
  iconPosition = "right",
  iconColor,
  variant,
  priority,
  size,
  rounding,
  state,
  direction,
  align,
  children,
  className,
  ...props
}: ButtonProps) => {
  const isLoading = state === "loading";
  const withChildren = Boolean(children);
  const withIcon = Boolean(icon);
  const withIconColor = Boolean(iconColor);
  let leftIcon: ReactNode | null = null;
  let rightIcon: ReactNode | null = null;

  if (iconPosition === "left") {
    leftIcon = isLoading ? <Spinner /> : withIcon ? icon : null;
  } else {
    rightIcon = isLoading ? <Spinner /> : withIcon ? icon : null;
  }

  const style = iconColor
    ? ({
        "--button-icon-color": iconColor,
      } as CSSProperties)
    : undefined;

  return (
    <button
      disabled={state === "loading"}
      style={style}
      className={cn(
        buttonVariants({
          variant,
          priority,
          size,
          rounding,
          content: withChildren ? "mixed" : "icon",
          state,
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
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
