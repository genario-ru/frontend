import type { ReactNode } from "react";

import { LogoLink } from "@/shared/components/common/logo-link";
import { Island, type IslandProps } from "@/shared/components/ui/island";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

type CommonHeaderProps = IslandProps & {
  logo?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

export function CommonHeader({
  logo = <LogoLink />,
  left,
  right,
  className,
  ...props
}: CommonHeaderProps) {
  const { isScrolled } = usePageCheckScroll();

  return (
    <Island
      as="header"
      row
      roundedTop={false}
      className={cn(
        "sticky top-0 z-1 items-center justify-between duration-200",
        {
          "shadow-bottom-1": isScrolled,
        },
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-6">
        {logo}
        {left}
      </div>
      {right}
    </Island>
  );
}
