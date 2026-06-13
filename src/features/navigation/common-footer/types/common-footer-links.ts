import type { LinkComponentProps } from "@tanstack/react-router";

type CommonFooterLinkItemStatic = {
  title: string;
};

type CommonFooterLinkItemLocal = LinkComponentProps;

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
