import type { HTMLAttributes } from "react";

import { SPACE } from "@/shared/constants/unicode";

import { AuthDocumentLink } from "./auth-document-link";

type MarketingConsentTextProps = HTMLAttributes<HTMLSpanElement>;

export const MarketingConsentText = ({
  className,
  ...props
}: MarketingConsentTextProps) => {
  return (
    <span className={className} {...props}>
      Я соглашаюсь на получение рекламных предложений и информационных рассылок
      в соответствии с{SPACE}
      <AuthDocumentLink
        to="/legal/$slug"
        params={{ slug: "advertising-consent" }}
      >
        согласием на рекламную рассылку
      </AuthDocumentLink>
      .
    </span>
  );
};
