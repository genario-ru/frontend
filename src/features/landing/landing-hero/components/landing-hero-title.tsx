import { SPACE } from "@/shared/constants/unicode";

const LANDING_HERO_TITLE_PRIMARY_PART = "Создавайте сценарии";
const LANDING_HERO_TITLE_SECONDARY_PART = "для видео за минуты, а не часы";

export function LandingHeroTitle() {
  return (
    <h1 className="max-w-[920px] text-center text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
      <span className="underline">{LANDING_HERO_TITLE_PRIMARY_PART}</span>
      {SPACE}
      <span className="text-neutral-6">
        {LANDING_HERO_TITLE_SECONDARY_PART}
      </span>
    </h1>
  );
}
