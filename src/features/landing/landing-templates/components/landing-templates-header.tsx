import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_TEMPLATES_TITLE = "Шаблоны под разные сценарии";
const LANDING_TEMPLATES_DESCRIPTION =
  "Выбирайте шаблон под задачу ролика: обзор, туториал, storytelling, vlog и другие сценарные форматы. Это помогает сразу выстраивать материал в нужной логике, а не собирать структуру с нуля.";

export function LandingTemplatesHeader() {
  return (
    <LandingSectionHeader
      title={LANDING_TEMPLATES_TITLE}
      description={LANDING_TEMPLATES_DESCRIPTION}
    />
  );
}
