import { useGetApiV1ProductFeatures } from "@/codegen/api/product";

export function useGetProductFeatures() {
  const {
    data: productFeaturesData,
    isLoading: isProductFeaturesLoading,
    isError: isProductFeaturesError,
  } = useGetApiV1ProductFeatures();

  const productFeatures = [...(productFeaturesData?.data ?? [])].sort(
    (left, right) => Number(right.available) - Number(left.available),
  );

  return {
    productFeaturesData,
    productFeatures,
    isProductFeaturesLoading,
    isProductFeaturesError,
  };
}
