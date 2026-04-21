import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeArchiveItemsCarousel } from "@/widgets/home/home-archive-items-carousel/components/home-archive-items-carousel";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";

export function HomeComponent() {
  return (
    <>
      <HomeAppMenubar />
      <PageLayout className="pb-2">
        <ContentLayout>
          <HomeTemplatesCarousel />
          <HomeArchiveItemsCarousel />
        </ContentLayout>
      </PageLayout>
      <CommonFooter className="mt-auto" />
    </>
  );
}
