import { Badge } from "@/shared/components/ui/badge";

import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_TEMPLATES_BADGE = "Что-то очень важное";
const LANDING_TEMPLITES_TITLE = "Шаблоны на все случаи";
const LANDING_TEMPLITES_DESCRIPTION =
  "Создавайте сценарии для видео за минуты, а не часы, Создавайте сценарии для видео за минуты, а не часы, Создавайте сценарии";

export function LandingTemplatesHeader() {
  return (
    <LandingSectionHeader
      badge={
        <Badge color="custom" className="bg-accent-1 text-accent-6">
          {LANDING_TEMPLATES_BADGE}
        </Badge>
      }
      title={LANDING_TEMPLITES_TITLE}
      description={LANDING_TEMPLITES_DESCRIPTION}
    />
  );
}
