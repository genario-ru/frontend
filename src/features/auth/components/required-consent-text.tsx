import type { HTMLAttributes } from "react";

import { SPACE } from "@/shared/constants/unicode";

import { AuthDocumentLink } from "./auth-document-link";

type RequiredConsentTextProps = HTMLAttributes<HTMLSpanElement>;

export const RequiredConsentText = ({
  className,
  ...props
}: RequiredConsentTextProps) => {
  return (
    <span className={className} {...props}>
      Я принимаю условия{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "terms-of-service" }}>
        пользовательского соглашения
      </AuthDocumentLink>
      {SPACE}и{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "public-offer" }}>
        публичной оферты
      </AuthDocumentLink>
      , а также{SPACE} даю согласие на обработку персональных данных{SPACE} на
      {SPACE}условиях{SPACE}
      <AuthDocumentLink to="/legal/$slug" params={{ slug: "privacy-policy" }}>
        политики обработки персональных данных
      </AuthDocumentLink>
      .
    </span>
  );
};
