import { Link } from "@tanstack/react-router";

import type { CommonFooterLinksColumn } from "../types/common-footer-links";

type CommonFooterLinksColumnProps = CommonFooterLinksColumn;

const commonFooterLinkClassName =
  "text-neutral-6 hover:text-neutral-8 duration-200 hover:underline";

export function CommonFooterLinksColumn({
  title,
  items,
}: CommonFooterLinksColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">{title}</p>
      {items.map((item, index) => {
        const isExternalLink = "href" in item;

        if (isExternalLink) {
          return (
            <a
              key={`footer-documents-${item.title}-item-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={commonFooterLinkClassName}
            >
              {item.title}
            </a>
          );
        }

        return (
          <Link
            key={`footer-documents-${item.title}-item-${index}`}
            to={item.to}
            className={commonFooterLinkClassName}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
