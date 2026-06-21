import { SPACE } from "@/shared/constants/unicode";

const WAITLIST_LANDING_HERO_TITLE_PRIMARY_PART =
  "Идеи и сценарии под ваш канал,";
const WAITLIST_LANDING_HERO_TITLE_SECONDARY_PART = "а не общие шаблоны";

export function WaitlistLandingHeroTitle() {
  return (
    <h1 className="text-neutral-6 max-w-4xl text-center text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl">
      {WAITLIST_LANDING_HERO_TITLE_PRIMARY_PART}
      {SPACE}
      <span className="text-neutral-8 underline">
        {WAITLIST_LANDING_HERO_TITLE_SECONDARY_PART}
      </span>
    </h1>
  );
}
