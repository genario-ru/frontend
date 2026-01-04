import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

import type { AppNavigationTabItem } from "../types";

type AppNavigationTabsProps = PropsWithClassName<{
  navigationItems: AppNavigationTabItem[];
}>;

export const AppNavigationTabs = ({
  navigationItems,
  className,
}: AppNavigationTabsProps) => {
  // const { currentTab, setCurrentTab } = useCurrentTab();
  // const defaultValue = currentTab ?? navigationItems[0].tab;

  return (
    <Tabs
      // defaultValue={defaultValue}
      // value={currentTab}
      // onValueChange={setCurrentTab}
      className={className}
    >
      <TabsList>
        {navigationItems.map(({ label, tab }) => (
          <TabsTrigger key={tab} value={tab}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
