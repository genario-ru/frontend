import { LandingMenubarActions } from "@/features/landing/landing-menubar/components/landing-menubar-actions";
import { LandingMenubarLinks } from "@/features/landing/landing-menubar/components/landing-menubar-links";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";

export function LandingMenubar() {
  const { isScrolled } = usePageCheckScroll();

  return (
    <div className="sticky top-0 z-1 flex w-full items-center justify-between">
      <LandingMenubarLinks withShadow={isScrolled} />
      <LandingMenubarActions withShadow={isScrolled} />
    </div>
  );
}
