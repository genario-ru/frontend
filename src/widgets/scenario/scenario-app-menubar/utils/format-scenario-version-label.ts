const versionLabelFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatScenarioVersionLabel(order: number, createdAt: string) {
  const parts = versionLabelFormatter.formatToParts(new Date(createdAt));

  const getVersionLabelPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const time = `${getVersionLabelPart("hour")}:${getVersionLabelPart("minute")}`;
  const date = `${getVersionLabelPart("day")}.${getVersionLabelPart("month")}.${getVersionLabelPart("year")}`;

  return `Версия ${order} — ${time}, ${date}`;
}
