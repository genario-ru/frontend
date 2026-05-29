import { useCallback, useState } from "react";

import {
  acceptCookieConsent,
  hasCookieConsentDecision,
  rejectCookieConsent,
} from "@/shared/utils/cookie-consent";

export function useCookieConsentBanner() {
  const [hasDecision, setHasDecision] = useState(() =>
    hasCookieConsentDecision(),
  );

  const handleAccept = useCallback(() => {
    acceptCookieConsent();
    setHasDecision(true);
  }, []);

  const handleReject = useCallback(() => {
    rejectCookieConsent();
    setHasDecision(true);
  }, []);

  return { hasDecision, handleAccept, handleReject };
}
