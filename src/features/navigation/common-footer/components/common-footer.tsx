import { Logo } from "@/shared/components/common/logo";
import { Island } from "@/shared/components/ui/island";

import { commonFooterLinks } from "../constants/common-footer-links";
import { CommonFooterLegalInfo } from "./common-footer-legal-info";
import { CommonFooterLinksColumn } from "./common-footer-links-column";

export function CommonFooter() {
  return (
    <Island
      as="footer"
      row
      roundedBottom={false}
      className="flex w-full justify-between"
    >
      <div className="flex flex-col justify-between gap-8">
        <Logo />
        <CommonFooterLegalInfo />
      </div>
      <nav className="flex gap-12">
        {commonFooterLinks.map((column, index) => (
          <CommonFooterLinksColumn
            key={`footer-links-column-${index}`}
            title={column.title}
            items={column.items}
          />
        ))}
      </nav>
    </Island>
  );
}
