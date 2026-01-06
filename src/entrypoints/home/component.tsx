import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";

export function HomeComponent() {
  return (
    <>
      <HomeAppMenubar actions={null} />
      <PageLayout>
        <ContentLayout>
          <HomeTemplatesCarousel />
        </ContentLayout>
      </PageLayout>
    </>
  );
}
