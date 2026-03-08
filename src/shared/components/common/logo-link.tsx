import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

import { Logo, type LogoProps } from "./logo";

type LogoLinkProps = LogoProps & LinkComponentProps;

export const LogoLink = ({
  to = "/",
  size,
  className,
  ...props
}: LogoLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "focus-visible:ring-neutral-8 h-fit w-fit focus-visible:ring-2",
        className,
      )}
      {...props}
    >
      <Logo size={size} />
    </Link>
  );
};
