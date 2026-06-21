const WAITLIST_LANDING_HERO_SUBTITLE =
  "Genario знает ваш канал и помогает на каждом шаге — от идей и сценария под съёмку до плана монтажа, метаданных и обложки. Подключите канал или загрузите материалы, чтобы готовить контент в вашем стиле.";

export function WaitlistLandingHeroSubtitle() {
  return (
    <p className="text-neutral-1/70 dark:text-neutral-8/70 max-w-2xl text-left text-base text-balance sm:text-lg lg:text-xl">
      {WAITLIST_LANDING_HERO_SUBTITLE}
    </p>
  );
}
