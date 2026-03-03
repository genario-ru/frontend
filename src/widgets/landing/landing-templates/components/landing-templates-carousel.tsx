import "swiper/swiper.css";

import { useMemo } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  TemplateCard,
  TemplateCardSkeleton,
} from "@/features/templates/template-card/components/template-card";

import { useLandingTemplatesCarousel } from "../hooks/use-landing-templates-carousel";

export function LandingTemplatesCarousel() {
  const { templatesData, isTemplatesLoading } = useLandingTemplatesCarousel();

  const slides = useMemo(() => {
    if (isTemplatesLoading) {
      return (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={`archive-items-skeleton-${index}`}>
              <TemplateCardSkeleton className="h-full" />
            </SwiperSlide>
          ))}
        </>
      );
    }

    if (!templatesData?.data?.length) {
      return null;
    }

    return templatesData.data.map((item) => (
      <SwiperSlide key={item.id} style={{ height: "auto" }}>
        <TemplateCard
          icon={item.icon}
          title={item.name}
          description={item.description}
          color={item.color}
          className="h-full"
        />
      </SwiperSlide>
    ));
  }, [templatesData, isTemplatesLoading]);

  return (
    <Swiper
      loop
      speed={2000}
      autoplay={{
        delay: 1000,
        pauseOnMouseEnter: true,
      }}
      spaceBetween={8}
      slidesPerView={3.2}
      modules={[Autoplay]}
      style={{ overflow: "visible" }}
      className="w-full"
      wrapperClass="grid min-h-[176px] w-full auto-cols-fr ease-linear auto-rows-fr"
    >
      {slides}
    </Swiper>
  );
}
