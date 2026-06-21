import type { ProductFeatureSchema } from "@/codegen/api/product";

export function prepareWaitlistLandingFormInterests(
  productFeatures: ProductFeatureSchema[],
) {
  return productFeatures.map((productFeature) => ({
    value: productFeature.id,
    children: productFeature.name,
  }));
}
