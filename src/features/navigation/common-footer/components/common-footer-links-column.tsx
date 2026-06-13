import { Link } from "@tanstack/react-router";

import type { CommonFooterLinksColumn } from "../types/common-footer-links";

type CommonFooterLinksColumnProps = CommonFooterLinksColumn;

const COMMON_FOOTER_LINK_CLASS_NAME =
  "text-neutral-6 hover:text-neutral-8 text-sm duration-200 hover:underline";

export function CommonFooterLinksColumn({
  title,
  items,
}: CommonFooterLinksColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      {items.map((item, index) => {
        const isExternalLink = "href" in item;

        if (isExternalLink) {
          return (
            <a
              key={`footer-documents-${item.title}-item-${index}`}
              className={COMMON_FOOTER_LINK_CLASS_NAME}
              {...item}
            >
              {item.title}
            </a>
          );
        }

        return (
          <Link
            key={`footer-documents-${item.title}-item-${index}`}
            target="_blank"
            rel="noopener noreferrer"
            to={item.to}
            params={item.params}
            className={COMMON_FOOTER_LINK_CLASS_NAME}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
