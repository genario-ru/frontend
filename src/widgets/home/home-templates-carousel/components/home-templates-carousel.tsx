import "swiper/swiper.css";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { HomeCarouselArrows } from "@/features/home/home-carousel/components/home-carousel-arrows";
import { TemplateCard } from "@/features/templates/template-card/components/template-card";
import { TemplateCardDrawerMenu } from "@/features/templates/template-card/components/template-card-drawer-menu";
import { Drawer, DrawerTrigger } from "@/shared/components/ui/drawer";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

import { useHomeTemplatesCarousel } from "../hooks/use-home-templates-carousel";
import { HomeTemplatesCarouselHoverMenu } from "./home-templates-carousel-hover-menu";

export function HomeTemplatesCarousel() {
  const {
    templatesData,
    slidesPerView,
    isTouchScreen,
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

    if (!templatesData) {
      return null;
    }

    return templatesData.data.map((template) => {
      if (isTouchScreen) {
        return (
          <SwiperSlide key={template.id}>
            <Drawer>
              <DrawerTrigger
                nativeButton={false}
                render={({ className, ...props }) => (
                  <TemplateCard
                    icon={template.icon}
                    title={template.name}
                    description={template.description}
                    color={template.color}
                    className={cn("group relative h-full", className)}
                    {...props}
                  />
                )}
              />
              <TemplateCardDrawerMenu
                templateId={template.id}
                templateName={template.name}
              />
            </Drawer>
          </SwiperSlide>
        );
      }

      return (
        <SwiperSlide key={template.id}>
          <TemplateCard
            icon={template.icon}
            title={template.name}
            description={template.description}
            color={template.color}
            className="group relative h-full"
          >
            <HomeTemplatesCarouselHoverMenu templateId={template.id} />
          </TemplateCard>
        </SwiperSlide>
      );
    });
  }, [templatesData, isTemplatesLoading, isTouchScreen]);

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
        slidesPerView={slidesPerView}
        style={{ overflow: "visible" }}
        className="h-[160px] w-full"
      >
        {slides}
      </Swiper>
    </Island>
  );
}
