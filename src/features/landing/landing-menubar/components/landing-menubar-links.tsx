import { Logo } from "@/shared/components/common/logo";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

import { landingMenubarLinks } from "../constants/landing-menubar-links";

type LandingMenubarLinksProps = {
  withShadow?: boolean;
};

export function LandingMenubarLinks({
  withShadow = false,
}: LandingMenubarLinksProps) {
  return (
    <Island
      row
      roundedTop={false}
      className={cn("w-fit items-center gap-6 duration-200", {
        "shadow-bottom-1": withShadow,
      })}
    >
      <Logo />
      <nav className="flex items-center">
        {landingMenubarLinks.map(({ label, navigateOptions }, index) => (
          <ButtonLink
            priority="tertiary"
            key={`landing-menubar-link-${index}`}
            {...navigateOptions}
          >
            {label}
          </ButtonLink>
        ))}
      </nav>
    </Island>
  );
}
