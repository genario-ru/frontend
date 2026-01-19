type FormatTimeParams = {
  time: number;
  type?: "seconds" | "milliseconds";
};

export function formatTime({ time, type = "seconds" }: FormatTimeParams) {
  // Конвертируем миллисекунды в секунды, если необходимо
  const totalSeconds =
    type === "milliseconds" ? Math.floor(time / 1000) : Math.floor(time);

  // Вычисляем часы, минуты и секунды
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Форматируем с ведущими нулями
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  // Если есть часы, возвращаем HH:MM:SS, иначе MM:SS
  if (hours > 0) {
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds,
    )}`;
  }

  return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
}
