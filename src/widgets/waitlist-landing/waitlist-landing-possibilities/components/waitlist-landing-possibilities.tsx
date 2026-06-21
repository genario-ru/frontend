import { useGetProductFeatures } from "@/actions/product-features/hooks/use-get-product-features";
import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";
import { WaitlistLandingPossibilitiesHeader } from "@/features/waitlist-landing/waitlist-landing-possibilities/components/waitlist-landing-possibilities-header";
import { WaitlistLandingPossibilitiesList } from "@/features/waitlist-landing/waitlist-landing-possibilities/components/waitlist-landing-possibilities-list";
import { WaitlistLandingPossibilitiesSkeleton } from "@/features/waitlist-landing/waitlist-landing-possibilities/components/waitlist-landing-possibilities-skeleton";

export function WaitlistLandingPossibilities() {
  const { productFeatures, isProductFeaturesLoading } = useGetProductFeatures();

  return (
    <WaitlistLandingIsland
      id="possibilities"
      className="from-neutral-8 dark:from-neutral-1 to-accent-6 isolate items-center gap-6 bg-linear-to-r sm:gap-8"
    >
      <WaitlistLandingPossibilitiesHeader />
      {isProductFeaturesLoading ? (
        <WaitlistLandingPossibilitiesSkeleton />
      ) : (
        <WaitlistLandingPossibilitiesList productFeatures={productFeatures} />
      )}
    </WaitlistLandingIsland>
  );
}
