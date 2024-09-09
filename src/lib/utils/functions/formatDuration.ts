export default function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const dayString = days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "";
  const hourString = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minuteString = minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

  return [dayString, hourString, minuteString].filter(Boolean).join(", ");
}

export function getTimeFromSeconds(secs: number) {
  const days = Math.floor(secs / (24 * 3600));
  const hours = Math.floor((secs % (24 * 3600)) / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs - days * (24 * 3600);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getSecondsFromTime({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return seconds + minutes * 60 + hours * 60 * 60 + days * 60 * 60 * 24;
}
