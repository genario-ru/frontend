import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeArchiveItemsCarousel } from "@/widgets/home/home-archive-items-carousel/components/home-archive-items-carousel";
import { HomeOnboarding } from "@/widgets/home/home-onboarding/components/home-onboarding";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";

export function HomeComponent() {
  const { isDesktop } = useBreakpoints();
  const { sessionData } = useGetSession();
  const showOboarding = sessionData && !sessionData.user.hideOnboarding;

  return (
    <PageLayout>
      <HomeAppMenubar />
      <ContentLayout
        className={cn("grid", {
          "grid-cols-2": showOboarding && isDesktop,
        })}
      >
        {showOboarding && <HomeOnboarding />}
        <div className="flex h-full w-full flex-col gap-2 overflow-hidden">
          <HomeTemplatesCarousel />
          <HomeArchiveItemsCarousel />
        </div>
      </ContentLayout>
      <CommonFooter className="mt-auto" />
    </PageLayout>
  );
}
