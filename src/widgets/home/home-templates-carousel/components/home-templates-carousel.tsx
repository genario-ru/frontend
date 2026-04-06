import "swiper/swiper.css";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { HomeCarouselArrows } from "@/features/home/components/home-carousel-arrows";
import { TemplateCard } from "@/features/templates/template-card/components/template-card";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useHomeTemplatesCarousel } from "../hooks/use-home-templates-carousel";
import { HomeTemplatesCarouselSlideMenu } from "./home-templates-carousel-slide-menu";

export function HomeTemplatesCarousel() {
  const {
    templatesData,
    isTemplatesLoading,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  } = useHomeTemplatesCarousel();

  const slides = useMemo(() => {
    if (isTemplatesLoading) {
      return (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={`swiper-skeleton-${index}`}>
              <Skeleton className="rounded-4 h-[160px]" />
            </SwiperSlide>
          ))}
        </>
      );
    }

    if (templatesData) {
      return templatesData.data.map((template) => (
        <SwiperSlide key={template.id}>
          <TemplateCard
            icon={template.icon}
            title={template.name}
            description={template.description}
            color={template.color}
            className="group relative h-full"
          >
            <HomeTemplatesCarouselSlideMenu templateId={template.id} />
          </TemplateCard>
        </SwiperSlide>
      ));
    }

    return null;
  }, [templatesData, isTemplatesLoading]);

  return (
    <Island
      title="Шаблоны"
      actions={
        <HomeCarouselArrows
          hasPrevious={hasPreviousSlide}
          hasNext={hasNextSlide}
          onPreviousClick={onPreviousButtonClick}
          onNextClick={onNextButtonClick}
        />
      }
      className="isolate gap-3 overflow-hidden"
    >
      <Swiper
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        spaceBetween={8}
        slidesPerView={4.2}
        style={{ overflow: "visible" }}
        className="h-[160px] w-full"
      >
        {slides}
      </Swiper>
    </Island>
  );
}
