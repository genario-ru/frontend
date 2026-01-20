type ScenarioChapterHeaderScenesListItemProps = {
  name: string;
  time: string;
};

export function ScenarioChapterHeaderScenesListItem({
  name,
  time,
}: ScenarioChapterHeaderScenesListItemProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-left text-sm font-semibold">{name}</p>
      <p className="text-neutral-7 text-left text-xs">{time}</p>
    </div>
  );
}
