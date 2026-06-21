const WAITLIST_LANDING_HERO_SUBTITLE =
  "Подключите канал или загрузите свои материалы — Genario предложит идеи и напишет сценарий с подсказками для съёмки. А после съёмки поможет собрать монтажный план, метаданные и обложку.";

export function WaitlistLandingHeroSubtitle() {
  return (
    <p className="text-neutral-1/70 dark:text-neutral-8/70 max-w-2xl text-left text-base text-balance sm:text-lg lg:text-xl">
      {WAITLIST_LANDING_HERO_SUBTITLE}
    </p>
  );
}
