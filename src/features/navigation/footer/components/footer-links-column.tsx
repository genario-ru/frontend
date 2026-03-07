import { Link } from "@tanstack/react-router";

import type { FooterLinksColumn } from "../types/footer-links";

type FooterLinksColumnProps = FooterLinksColumn;

const footerLinkClassName =
  "text-neutral-6 hover:text-neutral-8 duration-200 hover:underline";

export function FooterLinksColumn({ title, items }: FooterLinksColumnProps) {
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
              className={footerLinkClassName}
            >
              {item.title}
            </a>
          );
        }

        return (
          <Link
            key={`footer-documents-${item.title}-item-${index}`}
            to={item.to}
            className={footerLinkClassName}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
