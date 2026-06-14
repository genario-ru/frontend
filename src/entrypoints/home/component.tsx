import { useSessionFromContext } from "@/actions/auth/hooks/use-session-from-context";
import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { cn } from "@/shared/utils/cn";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeArchiveItemsCarousel } from "@/widgets/home/home-archive-items-carousel/components/home-archive-items-carousel";
import { HomeOnboarding } from "@/widgets/home/home-onboarding/components/home-onboarding";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";

export function HomeComponent() {
  const { user } = useSessionFromContext();
  const showOboarding = !user.hideOnboarding;

  return (
    <PageLayout>
      <HomeAppMenubar />
      <ContentLayout className={cn("grid", { "grid-cols-2": showOboarding })}>
        {showOboarding && <HomeOnboarding />}
        <div className="flex h-full flex-col gap-2">
          <HomeTemplatesCarousel />
          <HomeArchiveItemsCarousel />
        </div>
      </ContentLayout>
      <CommonFooter className="mt-auto" />
    </PageLayout>
  );
}
