import { CRLF } from "@/shared/constants/unicode";

const LEGAL_INFO = `© 2026, Genario. Все права защищены${CRLF}ИП Алексеев Илья Эльвирович${CRLF}ИНН 590522069703${CRLF}ОГРН 324595800100619`;

export function CommonFooterLegalInfo() {
  return <p className="text-neutral-6 whitespace-pre-line">{LEGAL_INFO}</p>;
}
