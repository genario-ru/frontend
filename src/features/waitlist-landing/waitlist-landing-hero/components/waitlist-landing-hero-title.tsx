import { SPACE } from "@/shared/constants/unicode";

const WAITLIST_LANDING_HERO_TITLE_PRIMARY_PART = "От идеи до готового видео";
const WAITLIST_LANDING_HERO_TITLE_ACCENT_PART = "за минуты, а не часы";

export function WaitlistLandingHeroTitle() {
  return (
    <h1 className="text-neutral-1 dark:text-neutral-8 max-w-3xl text-left text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
      <span className="text-neutral-1 dark:text-neutral-8">
        {WAITLIST_LANDING_HERO_TITLE_PRIMARY_PART}
      </span>
      {SPACE}
      <span className="text-accent-4 decoration-accent-4 dark:text-accent-7 dark:decoration-accent-7 underline decoration-4 underline-offset-6">
        {WAITLIST_LANDING_HERO_TITLE_ACCENT_PART}
      </span>
    </h1>
  );
}
