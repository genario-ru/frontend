import { Badge } from "@/shared/components/ui/badge";

import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_POSSIBILITIES_BADGE = "Что-то очень важное";
const LANDING_POSSIBILITES_TITLE = "Возможности Genario";

const LANDING_POSSIBILITES_DESCRIPTION =
  "Создавайте сценарии для видео за минуты, а не часы, Создавайте сценарии для видео за минуты, а не часы, Создавайте сценарии";

export function LandingPossibilitiesHeader() {
  return (
    <LandingSectionHeader
      badge={
        <Badge
          color="custom"
          className="bg-neutral-1/30 dark:bg-neutral-8/30 text-neutral-1 dark:text-neutral-8"
        >
          {LANDING_POSSIBILITIES_BADGE}
        </Badge>
      }
      title={LANDING_POSSIBILITES_TITLE}
      description={LANDING_POSSIBILITES_DESCRIPTION}
      inverseColors={true}
    />
  );
}
