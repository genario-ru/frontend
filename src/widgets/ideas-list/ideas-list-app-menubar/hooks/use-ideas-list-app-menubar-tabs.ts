import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { ALL_TAB, SAVED_TAB } from "@/shared/constants/tab-names";

type UseIdeasListAppMenubarTabsParams = {
  ideasListId: string;
};

type IdeasListAppMenubarTab = {
  slug: string;
  name: string;
  active: boolean;
};

export function useIdeasListAppMenubarTabs({
  ideasListId,
}: UseIdeasListAppMenubarTabsParams) {
  const navigate = useNavigate();

  const search = useSearch({
    from: "/_with-auth/_with-subscription/ideas-lists/$ideasListId",
  });

  const handleTabClick = useCallback(
    (slug: string) => {
      navigate({
        to: "/ideas-lists/$ideasListId",
        params: { ideasListId },
        search: {
          ...search,
          tab: slug === SAVED_TAB ? SAVED_TAB : undefined,
        },
        replace: true,
      });
    },
    [ideasListId, search, navigate],
  );

  const tabs: IdeasListAppMenubarTab[] = useMemo(
    () => [
      {
        slug: ALL_TAB,
        name: "Все",
        active: search.tab === undefined,
      },
      {
        slug: SAVED_TAB,
        name: "Сохраненные",
        active: search.tab === SAVED_TAB,
      },
    ],
    [search.tab],
  );

  const activeTab = useMemo(() => tabs.find((tab) => tab.active), [tabs]);

  return {
    tabs,
    activeTab,
    handleTabClick,
  };
}
