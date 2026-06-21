type WaitlistLandingProblemCard = {
  index: string;
  title: string;
  description: string;
};

export function WaitlistLandingProblemCard({
  index,
  title,
  description,
}: WaitlistLandingProblemCard) {
  return (
    <div className="rounded-4 bg-neutral-2 flex h-full flex-col gap-3 p-5 sm:p-6">
      <span className="text-accent-6 text-sm font-semibold">{index}</span>
      <p className="text-neutral-8 text-lg sm:text-xl">{title}</p>
      <p className="text-neutral-8/60">{description}</p>
    </div>
  );
}
