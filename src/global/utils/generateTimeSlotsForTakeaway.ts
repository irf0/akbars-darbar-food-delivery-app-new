export interface TimeSlot {
  label: string;
  value: Date;
}

const SLOT_INTERVAL_MINUTES = 15;
const MIN_LEAD_TIME_MINUTES = 15;

/**
 * Generates discrete pickup time slots between `now` and `closeTime`.
 *
 * - First slot starts at least MIN_LEAD_TIME_MINUTES from `now`,
 *   rounded UP to the next fixed 15-minute mark (:00, :15, :30, :45).
 * - Slots continue every SLOT_INTERVAL_MINUTES.
 * - The final slot starts one interval before closing time.
 * - Returns [] if no valid slot remains today.
 *
 * @param openTime "HH:mm" 24-hour string (e.g. "11:00")
 * @param closeTime "HH:mm" 24-hour string (e.g. "22:30")
 * @param now current time (inject for testability)
 */
export const generateTimeSlots = (openTime: string, closeTime: string, now: Date): TimeSlot[] => {
  const open = parseTimeToday(openTime, now);
  const close = parseTimeToday(closeTime, now);

  const earliestPossible = new Date(now.getTime() + MIN_LEAD_TIME_MINUTES * 60_000);

  const rangeStart = earliestPossible > open ? earliestPossible : open;

  const firstSlot = roundUpToNextInterval(rangeStart, SLOT_INTERVAL_MINUTES);

  const lastSlot = new Date(close);
  lastSlot.setMinutes(lastSlot.getMinutes() - SLOT_INTERVAL_MINUTES);

  const slots: TimeSlot[] = [];
  let cursor = firstSlot;

  while (cursor <= lastSlot) {
    slots.push({
      label: formatLabel(cursor),
      value: new Date(cursor),
    });

    cursor = new Date(cursor.getTime() + SLOT_INTERVAL_MINUTES * 60_000);
  }

  return slots;
};

const parseTimeToday = (time: string, referenceDate: Date): Date => {
  const [hours, minutes] = time.split(':').map(Number);

  const result = new Date(referenceDate);
  result.setHours(hours, minutes, 0, 0);

  return result;
};

const roundUpToNextInterval = (date: Date, intervalMinutes: number): Date => {
  const result = new Date(date);

  const minutes = result.getMinutes();
  const remainder = minutes % intervalMinutes;

  if (remainder !== 0 || result.getSeconds() > 0 || result.getMilliseconds() > 0) {
    result.setMinutes(minutes + (intervalMinutes - remainder));
  }

  result.setSeconds(0, 0);

  return result;
};

const formatLabel = (date: Date): string => {
  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
