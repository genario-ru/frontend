import type { HTMLAttributes } from "react";

import { AuthDocumentLink } from "@/features/auth/components/auth-document-link";
import { SPACE } from "@/shared/constants/unicode";

type WaitlistLandingFormPrivacyConsentTextProps =
  HTMLAttributes<HTMLSpanElement>;

export const WaitlistLandingFormPrivacyConsentText = ({
  className,
  ...props
}: WaitlistLandingFormPrivacyConsentTextProps) => {
  return (
    <span className={className} {...props}>
      Я подтверждаю ознакомление с{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "privacy-policy" }}>
        политикой обработки персональных данных
      </AuthDocumentLink>
      .
    </span>
  );
};
