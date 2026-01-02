import { type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import { Spinner } from "./spinner";

export type PublicButtonVariantsProps = Omit<
  VariantProps<typeof buttonVariants>,
  "content"
>;

export type ButtonProps = ComponentProps<"button"> &
  PublicButtonVariantsProps & {
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const Button = ({
  icon,
  iconPosition = "right",
  color,
  variant,
  size,
  state,
  children,
  className,
  ...props
}: ButtonProps) => {
  const isLoading = state === "loading";
  const withChildren = Boolean(children);
  const withIcon = Boolean(icon);
  let leftIcon: ReactNode | null = null;
  let rightIcon: ReactNode | null = null;

  if (iconPosition === "left") {
    leftIcon = isLoading ? <Spinner /> : withIcon ? icon : null;
  } else {
    rightIcon = isLoading ? <Spinner /> : withIcon ? icon : null;
  }

  return (
    <button
      disabled={state === "loading"}
      className={cn(
        buttonVariants({
          color,
          variant,
          size,
          content: withChildren ? "mixed" : "icon",
          state,
        }),
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
