import { SPACE } from "@/shared/constants/unicode";

const LANDING_HERO_TITLE_PRIMARY_PART = "Сократите процесс подготовки видео";
const LANDING_HERO_TITLE_SECONDARY_PART = "с часов до минут";

export function LandingHeroTitle() {
  return (
    <h1 className="text-neutral-6 max-w-4xl text-center text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl">
      {LANDING_HERO_TITLE_PRIMARY_PART}
      {SPACE}
      <span className="text-neutral-8 underline">
        {LANDING_HERO_TITLE_SECONDARY_PART}
      </span>
    </h1>
  );
}
