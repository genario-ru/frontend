import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

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
  const search = useSearch({ from: "/_app/ideas-lists/$ideasListId" });

  const handleTabClick = useCallback(
    (slug: string) => {
      navigate({
        to: "/ideas-lists/$ideasListId",
        params: { ideasListId },
        search: {
          ...search,
          tab: slug === "saved" ? "saved" : undefined,
        },
      });
    },
    [ideasListId, search, navigate],
  );

  const tabs: IdeasListAppMenubarTab[] = useMemo(
    () => [
      {
        slug: "all",
        name: "Все",
        active: search.tab === undefined,
      },
      {
        slug: "saved",
        name: "Сохраненные",
        active: search.tab === "saved",
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
