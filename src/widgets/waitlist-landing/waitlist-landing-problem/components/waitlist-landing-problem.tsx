import { WaitlistLandingIsland } from "@/features/waitlist-landing/waitlist-landing-island/components/waitlist-landing-island";
import { WaitlistLandingProblemHeader } from "@/features/waitlist-landing/waitlist-landing-problem/components/waitlist-landing-problem-header";
import { WaitlistLandingProblemList } from "@/features/waitlist-landing/waitlist-landing-problem/components/waitlist-landing-problem-list";

export function WaitlistLandingProblem() {
  return (
    <WaitlistLandingIsland id="problem" className="items-center gap-6 sm:gap-8">
      <WaitlistLandingProblemHeader />
      <WaitlistLandingProblemList />
    </WaitlistLandingIsland>
  );
}
