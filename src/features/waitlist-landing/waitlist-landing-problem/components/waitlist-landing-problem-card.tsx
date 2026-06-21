import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

type WaitlistLandingProblemCard = {
  index: string;
  title: string;
  missing: string;
  solution: string;
};

export function WaitlistLandingProblemCard({
  index,
  title,
  missing,
  solution,
}: WaitlistLandingProblemCard) {
  return (
    <div className="rounded-4 bg-neutral-2 flex h-full flex-col gap-4 p-5 sm:p-6">
      <p className="text-neutral-8 text-lg font-medium sm:text-xl">
        {Number(index)}. {title}
      </p>
      <div className="grid gap-3">
        <div className="flex gap-3">
          <XCircleIcon className="stroke-negative-6 mt-0.5 size-6 shrink-0" />
          <p className="text-neutral-8/60">{missing}</p>
        </div>
        <div className="flex gap-3">
          <CheckCircle2Icon className="stroke-positive-6 mt-0.5 size-6 shrink-0" />
          <p className="text-neutral-8">{solution}</p>
        </div>
      </div>
    </div>
  );
}
