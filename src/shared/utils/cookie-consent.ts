import Cookies from "js-cookie";

import { accountIndependentCookies } from "@/shared/constants/account-independent-cookies";
import { COOKIE_CONSENT_CHANGE_EVENT } from "@/shared/constants/window-events";

const COOKIE_CONSENT_ACCEPTED_VALUE = "accepted";
const COOKIE_CONSENT_REJECTED_VALUE = "rejected";
const COOKIE_CONSENT_EXPIRATION_DAYS = 180;

function setCookieConsent(value: string) {
  Cookies.set(accountIndependentCookies.cookieConsent, value, {
    expires: COOKIE_CONSENT_EXPIRATION_DAYS,
    path: "/",
    sameSite: "Lax",
    secure: window.location.protocol === "https:",
  });

  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
}

export function hasCookieConsentDecision() {
  return Cookies.get(accountIndependentCookies.cookieConsent) !== undefined;
}

export function isCookieConsentAccepted() {
  return (
    Cookies.get(accountIndependentCookies.cookieConsent) ===
    COOKIE_CONSENT_ACCEPTED_VALUE
  );
}

export function acceptCookieConsent() {
  setCookieConsent(COOKIE_CONSENT_ACCEPTED_VALUE);
}

export function rejectCookieConsent() {
  setCookieConsent(COOKIE_CONSENT_REJECTED_VALUE);
}
