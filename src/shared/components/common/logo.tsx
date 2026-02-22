import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";

import LogoDarkIcon from "@/icons/logo-dark.svg";
import LogoLightIcon from "@/icons/logo-light.svg";
import { cn } from "@/shared/utils/cn";

const logoVariantProps = cva("", {
  variants: {
    size: {
      sm: "h-8 w-auto",
      base: "h-9 w-auto",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type LogoProps = VariantProps<typeof logoVariantProps> & LinkComponentProps;

export const Logo = ({ size, className, ...props }: LogoProps) => {
  return (
    <Link
      className={cn(
        "focus-visible:ring-neutral-8 h-fit w-fit focus-visible:ring-2",
        className,
      )}
      {...props}
    >
      <LogoDarkIcon
        className={cn(logoVariantProps({ size }), "block dark:hidden")}
      />
      <LogoLightIcon
        className={cn(logoVariantProps({ size }), "hidden dark:block")}
      />
    </Link>
  );
};
