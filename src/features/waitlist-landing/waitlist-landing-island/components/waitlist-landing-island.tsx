import { Island, type IslandProps } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type WaitlistLandingIslandProps = IslandProps;

export function WaitlistLandingIsland({
  className,
  ...props
}: WaitlistLandingIslandProps) {
  return (
    <Island
      as="section"
      className={cn("px-4 py-8 sm:px-6 sm:py-10 lg:p-12", className)}
      {...props}
    />
  );
}
