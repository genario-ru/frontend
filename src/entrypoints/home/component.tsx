import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeArchiveItemsCarousel } from "@/widgets/home/home-archive-items-carousel/components/home-archive-items-carousel";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";

export function HomeComponent() {
  return (
    <>
      <HomeAppMenubar />
      <PageLayout>
        <ContentLayout className="gap-4">
          <HomeTemplatesCarousel />
          <HomeArchiveItemsCarousel />
        </ContentLayout>
      </PageLayout>
    </>
  );
}
