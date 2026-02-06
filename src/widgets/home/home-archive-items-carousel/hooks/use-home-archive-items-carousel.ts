import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";

export function useHomeArchiveItemsCarousel() {
  const { archiveItemsData, isLoadingArchiveItems } = useGetMyArchiveItems();

  return {
    archiveItemsData,
    isLoadingArchiveItems,
  };
}
