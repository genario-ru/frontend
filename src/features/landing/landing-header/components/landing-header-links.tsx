import { ButtonLink } from "@/shared/components/ui/button-link";

import { landingHeaderLinks } from "../constants/landing-header-links";

export function LandingHeaderLinks() {
  return (
    <nav className="flex items-center">
      {landingHeaderLinks.map(({ label, navigateOptions }, index) => (
        <ButtonLink
          priority="tertiary"
          key={`landing-menubar-link-${index}`}
          className="shrink-0"
          {...navigateOptions}
        >
          {label}
        </ButtonLink>
      ))}
    </nav>
  );
}
