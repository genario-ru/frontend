import { cn } from "@/shared/utils/cn";

type ScenarioVersionRadioIndicatorProps = {
  checked: boolean;
};

export function ScenarioVersionRadioIndicator({
  checked,
}: ScenarioVersionRadioIndicatorProps) {
  return (
    <div
      className={cn(
        "flex size-5 items-center justify-center rounded-full duration-200",
        {
          "bg-neutral-8": checked,
          "bg-neutral-3": !checked,
        },
      )}
    >
      {checked && <div className="bg-neutral-1 size-2 rounded-full" />}
    </div>
  );
}
