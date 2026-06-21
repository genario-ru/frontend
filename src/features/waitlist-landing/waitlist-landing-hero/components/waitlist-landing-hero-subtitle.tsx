const WAITLIST_LANDING_HERO_SUBTITLE =
  "Genario учится на вашем контенте, стиле и подаче — и даёт идеи, сценарий под съёмку и план монтажа, которые подходят именно вам. Мы перестраиваем продукт под то, как авторы реально снимают и монтируют. Оставьте заявку — напишем, как только откроем доступ.";

export function WaitlistLandingHeroSubtitle() {
  return (
    <p className="text-neutral-8/60 max-w-2xl text-center text-base text-balance sm:text-lg lg:text-xl">
      {WAITLIST_LANDING_HERO_SUBTITLE}
    </p>
  );
}
