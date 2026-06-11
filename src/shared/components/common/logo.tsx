import { cva, type VariantProps } from "class-variance-authority";

import LogoFullDark from "@/assets/svgs/logos/logo-full-dark.svg";
import LogoFullLight from "@/assets/svgs/logos/logo-full-light.svg";
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

export type LogoProps = VariantProps<typeof logoVariantProps>;

export function Logo({ size }: LogoProps) {
  return (
    <>
      <LogoFullDark
        className={cn(logoVariantProps({ size }), "hidden dark:block")}
      />
      <LogoFullLight
        className={cn(logoVariantProps({ size }), "block dark:hidden")}
      />
    </>
  );
}
