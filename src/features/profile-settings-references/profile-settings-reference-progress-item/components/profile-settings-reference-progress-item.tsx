import { Progress } from "@/shared/components/ui/progress";

type ProfileSettingsReferenceProgressItemProps = {
  title: string;
  count: number;
  targetCount: number;
};

export function ProfileSettingsReferenceProgressItem({
  title,
  count,
  targetCount,
}: ProfileSettingsReferenceProgressItemProps) {
  const progressValue = Math.min(count, targetCount);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{title}</span>
        <span>
          {progressValue}/{targetCount}
        </span>
      </div>
      <Progress
        value={progressValue}
        max={targetCount}
        indicatorClassName="bg-positive-5"
      />
    </div>
  );
}
