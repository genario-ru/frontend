import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import {
  profileSettingsAppMenubarTabsDefinition,
  profileSettingsAppMenubarTabSlugs,
} from "../constants/profile-settings-app-menubar-tabs";

type UseProfileSettingsAppMenubarTabsParams = {
  profileId?: string;
};

type ProfileSettingsAppMenubarTabItem = {
  slug: string;
  label: string;
  active: boolean;
  disabled: boolean;
};

function getProfileSettingsMenubarTabActive(
  tabSlug: string,
  pathname: string,
): boolean {
  if (tabSlug === profileSettingsAppMenubarTabSlugs.references) {
    return pathname.includes("/profiles/settings/references");
  }

  return !pathname.includes("/profiles/settings/references");
}

export function useProfileSettingsAppMenubarTabs({
  profileId,
}: UseProfileSettingsAppMenubarTabsParams) {
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (routerState) => routerState.location.pathname,
  });

  const tabs: ProfileSettingsAppMenubarTabItem[] = useMemo(
    () =>
      profileSettingsAppMenubarTabsDefinition.map((tabDefinition) => ({
        slug: tabDefinition.slug,
        label: tabDefinition.label,
        active: getProfileSettingsMenubarTabActive(
          tabDefinition.slug,
          pathname,
        ),
        disabled:
          tabDefinition.slug === profileSettingsAppMenubarTabSlugs.references &&
          !profileId,
      })),
    [pathname, profileId],
  );

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.active);
  }, [tabs]);

  const handleTabClick = useCallback(
    (nextSlug: string) => {
      const clickedTab = tabs.find((tab) => tab.slug === nextSlug);

      if (!clickedTab || clickedTab.disabled) {
        return;
      }

      const tabDefinition = profileSettingsAppMenubarTabsDefinition.find(
        (item) => item.slug === nextSlug,
      );

      if (!tabDefinition) {
        return;
      }

      if (tabDefinition.slug === profileSettingsAppMenubarTabSlugs.general) {
        navigate({
          to: "/profiles/settings",
          search: { profileId },
          replace: true,
        });

        return;
      }

      navigate({
        to: "/profiles/settings/references",
        search: { profileId: profileId! },
        replace: true,
      });
    },
    [navigate, profileId, tabs],
  );

  return {
    tabs,
    activeTab,
    handleTabClick,
  };
}
