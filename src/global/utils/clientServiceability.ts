// src/global/utils/clientServiceability.ts

//TODO: this is temporary will delete this once expo build done and backend func integrated!
interface ClientServiceabilityResult {
    serviceable: boolean
    distanceKm: number
}

const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const R = 6371 // Earth radius in km
    const toRad = (deg: number) => (deg * Math.PI) / 180

    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}

export const checkServiceabilityClient = (
    userLat: number,
    userLng: number,
    restaurantLat: number,
    restaurantLng: number,
    radiusKm: number
): ClientServiceabilityResult => {
    const distanceKm = haversineDistance(restaurantLat, restaurantLng, userLat, userLng)
    return {
        serviceable: distanceKm <= radiusKm,
        distanceKm,
    }
}