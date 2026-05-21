import { CRLF } from "@/shared/constants/unicode";

const COMMON_FOOTER_LEGAL_INFO_CLASS_NAME =
  "text-neutral-6 text-sm whitespace-pre-line";

const LEGAL_INFO = `© 2026, Genario${CRLF}ИП Алексеев Илья Эльвирович${CRLF}ИНН 590522069703${CRLF}ОГРН 324595800100619`;

const COMMON_FOOTER_LEGAL_INFO_EMERGENCY_TEXT =
  "* Meta признана экстремистской организацией и запрещена в Российской Федерации";

export function CommonFooterLegalInfo() {
  return (
    <div className="flex flex-col justify-between gap-6 lg:gap-12">
      <p className={COMMON_FOOTER_LEGAL_INFO_CLASS_NAME}>{LEGAL_INFO}</p>
      <p className={COMMON_FOOTER_LEGAL_INFO_CLASS_NAME}>
        {COMMON_FOOTER_LEGAL_INFO_EMERGENCY_TEXT}
      </p>
    </div>
  );
}
