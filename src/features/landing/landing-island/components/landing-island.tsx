import { Island, type IslandProps } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type LandingIsland = IslandProps;

export function LandingIsland({ className, ...props }: LandingIsland) {
  return <Island className={cn("p-12", className)} {...props} />;
}
