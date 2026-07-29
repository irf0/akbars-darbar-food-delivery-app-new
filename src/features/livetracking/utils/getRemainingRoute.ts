import { LatLng } from 'react-native-maps';

//haversine to calculate straight line distance
export function distanceBetween(pointA: LatLng, pointB: LatLng): number {
  const EARTH_RADIUS_METERS = 6371e3;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const latDifference = toRadians(pointB.latitude - pointA.latitude);
  const lonDifference = toRadians(pointB.longitude - pointA.longitude);

  const lat1 = toRadians(pointA.latitude);
  const lat2 = toRadians(pointB.latitude);

  const a =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDifference / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(a));
}

//[point0, point1, point2...] gets the last closest point in the route and calculates further distance from that point onwards
export function getRouteAheadOfRider(
  fullRoute: LatLng[],
  riderLocation: LatLng,
  lastKnownIndex: number,
): { remainingRoute: LatLng[]; newIndex: number } {
  let closestIndex = lastKnownIndex;
  let closestDistance = Infinity;

  // Look through the route, starting from where we left off, and find the
  // point nearest to the rider right now.
  for (let i = lastKnownIndex; i < fullRoute.length; i++) {
    const distance = distanceBetween(riderLocation, fullRoute[i]);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  // Everything before that point is "behind" the rider — drop it.
  const remainingRoute = fullRoute.slice(closestIndex);

  return { remainingRoute, newIndex: closestIndex };
}
