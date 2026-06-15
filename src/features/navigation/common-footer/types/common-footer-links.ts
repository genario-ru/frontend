import type { LinkComponentProps } from "@tanstack/react-router";

import type { YMGoal } from "@/lib/yandex-metrika";

type CommonFooterLinkItemStatic = {
  title: string;
  goal: YMGoal;
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
