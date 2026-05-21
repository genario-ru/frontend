import type { HTMLAttributes } from "react";

import { SPACE } from "@/shared/constants/unicode";

import { AuthDocumentLink } from "./auth-document-link";

type LegalConsentTextProps = HTMLAttributes<HTMLSpanElement>;

export const LegalConsentText = ({
  className,
  ...props
}: LegalConsentTextProps) => {
  return (
    <span className={className} {...props}>
      Я принимаю{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "terms-of-service" }}>
        пользовательское соглашение
      </AuthDocumentLink>
      ,{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "public-offer" }}>
        публичную оферту
      </AuthDocumentLink>
      {SPACE}и даю{SPACE}
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
