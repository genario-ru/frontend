import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";

export function HomeComponent() {
  return (
    <>
      <HomeAppMenubar />
      <ContentLayout>
        <HomeTemplatesCarousel />
      </ContentLayout>
    </>
  );
}
