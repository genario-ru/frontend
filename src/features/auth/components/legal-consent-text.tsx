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
      {SPACE}и{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "public-offer" }}>
        публичную оферту
      </AuthDocumentLink>
      . С{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "privacy-policy" }}>
        политикой конфиденциальности
      </AuthDocumentLink>
      {SPACE}ознакомлен(а).
    </span>
  );
};
