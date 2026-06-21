import { waitlistLandingProblemList } from "../constants/waitlist-landing-problem-list";
import { WaitlistLandingProblemCard } from "./waitlist-landing-problem-card";

export function WaitlistLandingProblemList() {
  return (
    <div className="grid w-full gap-3 md:grid-cols-2">
      {waitlistLandingProblemList.map(({ index, title, missing, solution }) => (
        <WaitlistLandingProblemCard
          key={`waitlist-landing-problem-card-${index}`}
          index={index}
          title={title}
          missing={missing}
          solution={solution}
        />
      ))}
    </div>
  );
}
