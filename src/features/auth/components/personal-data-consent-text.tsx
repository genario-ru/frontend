import type { HTMLAttributes } from "react";

import { SPACE } from "@/shared/constants/unicode";

import { AuthDocumentLink } from "./auth-document-link";

type PersonalDataConsentTextProps = HTMLAttributes<HTMLSpanElement>;

export const PersonalDataConsentText = ({
  className,
  ...props
}: PersonalDataConsentTextProps) => {
  return (
    <span className={className} {...props}>
      Я даю{SPACE}
      <AuthDocumentLink
        to="/legal/$slug"
        params={{ slug: "privacy-policy-consent" }}
      >
        согласие на обработку персональных данных
      </AuthDocumentLink>
      {SPACE}на условиях{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "privacy-policy" }}>
        политики обработки персональных данных
      </AuthDocumentLink>
      .
    </span>
  );
};
