// calculate bearing (0-360°) from one point to another
export const getBearing = (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const startLat = toRad(start.latitude);
  const startLng = toRad(start.longitude);
  const endLat = toRad(end.latitude);
  const endLng = toRad(end.longitude);

  const dLng = endLng - startLng;

  const y = Math.sin(dLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

  const bearing = toDeg(Math.atan2(y, x));

  return (bearing + 360) % 360; // normalize to 0-360
};
