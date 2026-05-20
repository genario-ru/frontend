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
      Я соглашаюсь с{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "terms-of-service" }}>
        пользовательским соглашением
      </AuthDocumentLink>
      ,{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "public-offer" }}>
        публичной офертой
      </AuthDocumentLink>
      {SPACE}и{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "privacy-policy" }}>
        политикой конфиденциальности
      </AuthDocumentLink>
      .
    </span>
  );
};
