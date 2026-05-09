import { Island, type IslandProps } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type LandingIsland = IslandProps;

export function LandingIsland({ className, ...props }: LandingIsland) {
  return (
    <Island
      as="section"
      className={cn("px-4 py-8 sm:px-6 sm:py-10 lg:p-12", className)}
      {...props}
    />
  );
}
