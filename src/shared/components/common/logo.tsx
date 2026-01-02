import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import LogoDarkIcon from "@/assets/icons/logo-dark.svg";
import LogoLightIcon from "@/assets/icons/logo-light.svg";
import { cn } from "@/shared/utils/cn";

export const Logo = ({ className, ...props }: LinkComponentProps) => {
  return (
    <Link
      className={cn(
        "focus-visible:ring-new-neutral-8 h-fit w-fit focus-visible:ring-2",
        className,
      )}
      {...props}
    >
      <LogoDarkIcon className="block dark:hidden" />
      <LogoLightIcon className="hidden dark:block" />
    </Link>
  );
};
