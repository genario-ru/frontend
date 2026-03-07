import type { LinkProps } from "@tanstack/react-router";

type FooterLinkItemStatic = {
  title: string;
};

type FooterLinkItemLocal = {
  to: LinkProps["to"];
};

type FooterLinkItemExternal = {
  href: string;
};

type FooterLinkItemDynamic = FooterLinkItemLocal | FooterLinkItemExternal;

type FooterLinkItem = FooterLinkItemStatic & FooterLinkItemDynamic;

export type FooterLinksColumn = {
  title: string;
  items: FooterLinkItem[];
};
