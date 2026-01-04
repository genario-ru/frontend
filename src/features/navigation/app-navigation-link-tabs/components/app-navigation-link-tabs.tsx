import { Link } from "@tanstack/react-router";

import { Tabs, TabsList } from "@/shared/components/ui/tabs";
import { tabsTriggerVariants } from "@/shared/constants/tabs-trigger-variants";

import type { AppNavigationLinkTabItem } from "../types";

type AppNavigationLinkTabsProps = {
  navigationItems: AppNavigationLinkTabItem[];
};

export const AppNavigationLinkTabs = ({
  navigationItems,
}: AppNavigationLinkTabsProps) => {
  return (
    <Tabs>
      <TabsList>
        {navigationItems.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className={tabsTriggerVariants({
              state: "default",
            })}
            activeProps={{
              className: tabsTriggerVariants({
                state: "active",
              }),
            }}
          >
            {label}
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
};
