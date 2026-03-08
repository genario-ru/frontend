import type { LinkProps } from "@tanstack/react-router";

type CommonFooterLinkItemStatic = {
  title: string;
};

type CommonFooterLinkItemLocal = {
  to: LinkProps["to"];
};

type CommonFooterLinkItemExternal = {
  href: string;
};

type CommonFooterLinkItemDynamic =
  | CommonFooterLinkItemLocal
  | CommonFooterLinkItemExternal;

type CommonFooterLinkItem = CommonFooterLinkItemStatic &
  CommonFooterLinkItemDynamic;

export type CommonFooterLinksColumn = {
  title: string;
  items: CommonFooterLinkItem[];
};
