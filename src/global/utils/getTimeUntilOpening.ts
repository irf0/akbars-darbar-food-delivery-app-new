export const getTimeUntilOpening = (openingTime: string): string => {
  const now = new Date();
  const opening = new Date();

  const [hours, minutes] = openingTime.split(':').map(Number);

  opening.setHours(hours, minutes, 0, 0);

  if (now > opening) {
    opening.setDate(opening.getDate() + 1);
  }

  const diff = opening.getTime() - now.getTime();

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  return `${h}h ${m}m ${s}s`;
};

export const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);

  return `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
};
