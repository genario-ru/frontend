import "swiper/swiper.css";

import { XIcon } from "lucide-react";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArchiveFilterSkeleton } from "@/features/archive/archive-filters/components/archive-filter-skeleton";
import { Button } from "@/shared/components/ui/button";

import { useArchiveFilters } from "../hooks/use-archive-filters";
import { ArchiveFilter } from "./archive-filter";

export function ArchiveFiltersCarousel() {
  const {
    archiveFiltersData,
    hasActiveFilters,
    isArchiveFiltersLoading,
    handleResetArchiveFilters,
  } = useArchiveFilters();

  const filters = useMemo(() => {
    if (isArchiveFiltersLoading) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide
              key={`swiper-skeleton-${index}`}
              style={{ width: "auto" }}
            >
              <ArchiveFilterSkeleton />
            </SwiperSlide>
          ))}
        </>
      );
    }

    if (!archiveFiltersData) return null;

    return archiveFiltersData.data.map((filter) => (
      <SwiperSlide key={filter.slug} style={{ width: "auto" }}>
        <ArchiveFilter filter={filter} />
      </SwiperSlide>
    ));
  }, [archiveFiltersData, isArchiveFiltersLoading]);

  return (
    <div className="flex w-full gap-2">
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        style={{ overflow: "visible" }}
        className="w-full"
      >
        {filters}
      </Swiper>
      {hasActiveFilters && (
        <Button size="sm" icon={<XIcon />} onClick={handleResetArchiveFilters}>
          Сбросить
        </Button>
      )}
    </div>
  );
}
