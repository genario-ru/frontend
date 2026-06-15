import { ButtonLink } from "@/shared/components/ui/button-link";

import { landingHeaderLinks } from "../constants/landing-header-links";
import { useLandingHeaderLinks } from "../hooks/use-landing-header-links";

export function LandingHeaderLinks() {
  const { handleClick } = useLandingHeaderLinks();

  return (
    <nav className="flex items-center">
      {landingHeaderLinks.map(({ label, navigateOptions }, index) => (
        <ButtonLink
          priority="tertiary"
          key={`landing-menubar-link-${index}`}
          className="shrink-0"
          {...navigateOptions}
          onClick={handleClick}
        >
          {label}
        </ButtonLink>
      ))}
    </nav>
  );
}
