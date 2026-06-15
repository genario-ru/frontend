import { Link } from "@tanstack/react-router";

import { useCommonFooterLinksColumn } from "../hooks/use-common-footer-links-column";
import type { CommonFooterLinksColumn } from "../types/common-footer-links";

type CommonFooterLinksColumnProps = CommonFooterLinksColumn;

const COMMON_FOOTER_LINK_CLASS_NAME =
  "text-neutral-6 hover:text-neutral-8 text-sm duration-200 hover:underline";

export function CommonFooterLinksColumn({
  title,
  items,
}: CommonFooterLinksColumnProps) {
  const preparedItems = useCommonFooterLinksColumn(items);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      {preparedItems.map(({ link, handleClick }, index) => {
        const isExternalLink = "href" in link;

        if (isExternalLink) {
          return (
            <a
              key={`footer-documents-${link.title}-item-${index}`}
              className={COMMON_FOOTER_LINK_CLASS_NAME}
              {...link}
              href={link.href}
              onClick={handleClick}
            >
              {link.title}
            </a>
          );
        }

        return (
          <Link
            key={`footer-documents-${link.title}-item-${index}`}
            target="_blank"
            rel="noopener noreferrer"
            to={link.to}
            params={link.params}
            className={COMMON_FOOTER_LINK_CLASS_NAME}
            onClick={handleClick}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}
