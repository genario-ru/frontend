import { ButtonLink } from "@/shared/components/ui/button-link";

import { waitlistLandingHeaderLinks } from "../constants/waitlist-landing-header-links";

export function WaitlistLandingHeaderLinks() {
  return (
    <nav className="flex items-center">
      {waitlistLandingHeaderLinks.map(({ label, navigateOptions }, index) => (
        <ButtonLink
          priority="tertiary"
          key={`waitlist-landing-menubar-link-${index}`}
          className="shrink-0"
          {...navigateOptions}
        >
          {label}
        </ButtonLink>
      ))}
    </nav>
  );
}
