import { useState } from "react";

import {
  acceptCookieConsent,
  hasCookieConsentDecision,
  rejectCookieConsent,
} from "../utils/cookie-consent";

export function useCookieConsentBanner() {
  const [hasDecision, setHasDecision] = useState(() =>
    hasCookieConsentDecision(),
  );

  const handleAccept = () => {
    acceptCookieConsent();
    setHasDecision(true);
  };

  const handleReject = () => {
    rejectCookieConsent();
    setHasDecision(true);
  };

  return { hasDecision, handleAccept, handleReject };
}
