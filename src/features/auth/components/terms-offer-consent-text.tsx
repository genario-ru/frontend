import type { HTMLAttributes } from "react";

import { SPACE } from "@/shared/constants/unicode";

import { AuthDocumentLink } from "./auth-document-link";

type TermsOfferConsentTextProps = HTMLAttributes<HTMLSpanElement>;

export const TermsOfferConsentText = ({
  className,
  ...props
}: TermsOfferConsentTextProps) => {
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
      .
    </span>
  );
};
