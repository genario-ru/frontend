import type { HTMLAttributes } from "react";

import { AuthDocumentLink } from "@/features/auth/components/auth-document-link";
import { SPACE } from "@/shared/constants/unicode";

type WaitlistLandingFormMarketingConsentTextProps =
  HTMLAttributes<HTMLSpanElement>;

export const WaitlistLandingFormMarketingConsentText = ({
  className,
  ...props
}: WaitlistLandingFormMarketingConsentTextProps) => {
  return (
    <span className={className} {...props}>
      Я соглашаюсь на получение рекламных и информационных материалов в
      соответствии с{SPACE}
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
