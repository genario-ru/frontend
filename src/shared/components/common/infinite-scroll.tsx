import { type ComponentProps, useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";

type InfiniteScrollProps = ComponentProps<"div"> & {
  /**
   * Value to trigger observer refresh
   * In most cases is items count
   */
  signature?: unknown;
  isLoading?: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export function InfiniteScroll({
  signature,
  isLoading,
  hasNextPage,
  fetchNextPage,
  children,
  ...props
}: InfiniteScrollProps) {
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [signature, hasNextPage, isLoading, isIntersecting, fetchNextPage]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
