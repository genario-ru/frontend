import { cva } from "class-variance-authority";

import LogoIconDark from "@/assets/svgs/logos/logo-full-dark.svg";
import LogoIconLight from "@/assets/svgs/logos/logo-full-light.svg";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { cn } from "@/shared/utils/cn";

const logoIconVariants = cva(
  "m-auto animate-bounce h-10 w-auto object-fit duration-100",
);

export function RootPendingComponent() {
  return (
    <PageLayout className="justify-center">
      <ContentLayout>
        <LogoIconDark className={cn(logoIconVariants(), "hidden dark:block")} />
        <LogoIconLight className={cn(logoIconVariants(), "dark:hidden")} />
      </ContentLayout>
    </PageLayout>
  );
}
