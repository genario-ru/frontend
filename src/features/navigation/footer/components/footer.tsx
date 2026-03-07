import { Logo } from "@/shared/components/common/logo";
import { Island } from "@/shared/components/ui/island";

import { footerLinks } from "../constants/footer-links";
import { FooterLegalInfo } from "./footer-legal-info";
import { FooterLinksColumn } from "./footer-links-column";

export function Footer() {
  return (
    <Island
      as="footer"
      row
      roundedBottom={false}
      className="flex w-full justify-between"
    >
      <div className="flex flex-col justify-between gap-8">
        <Logo />
        <FooterLegalInfo />
      </div>
      <nav className="flex gap-12">
        {footerLinks.map((column, index) => (
          <FooterLinksColumn
            key={`footer-links-column-${index}`}
            title={column.title}
            items={column.items}
          />
        ))}
      </nav>
    </Island>
  );
}
