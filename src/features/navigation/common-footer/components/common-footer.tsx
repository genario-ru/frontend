import { Island } from "@/shared/components/ui/island";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import { commonFooterLinks } from "../constants/common-footer-links";
import { CommonFooterLegalInfo } from "./common-footer-legal-info";
import { CommonFooterLinksColumn } from "./common-footer-links-column";

type CommonFooterProps = PropsWithClassName;

export function CommonFooter({ className }: CommonFooterProps) {
  return (
    <Island
      row
      as="footer"
      roundedBottom={false}
      className={cn("flex w-full justify-between", className)}
    >
      <CommonFooterLegalInfo />
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
