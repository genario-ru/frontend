const LANDING_HERO_SUBTITLE =
  "Genario придумает идеи, напишет сценарий и подготовит описания для каждой площадки — так, будто вы сделали всё это сами.";

export function LandingHeroSubtitle() {
  return (
    <p className="text-neutral-8/60 max-w-2xl text-center text-base text-balance sm:text-lg lg:text-xl">
      {LANDING_HERO_SUBTITLE}
    </p>
  );
}
