import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { DeliverySettings, ServiceabilityRequest, ServiceabilityResponse } from "./types";

function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Earth radius in km
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export const serviceability = functions.https.onCall(
    async (data: ServiceabilityRequest): Promise<ServiceabilityResponse> => {
        const { lat, lng } = data;

        if (
            typeof lat !== "number" ||
            typeof lng !== "number" ||
            Number.isNaN(lat) ||
            Number.isNaN(lng)
        ) {
            throw new functions.https.HttpsError(
                "invalid-argument",
                "lat and lng must be valid numbers"
            );
        }

        const settingsDoc = await admin
            .firestore()
            .collection("adminSettings")
            .doc("delivery")
            .get();

        if (!settingsDoc.exists) {
            throw new functions.https.HttpsError(
                "failed-precondition",
                "Delivery settings not configured"
            );
        }

        const settings = settingsDoc.data() as DeliverySettings;

        const distanceKm = haversineDistance(
            settings.latitude,
            settings.longitude,
            lat,
            lng
        );

        if (distanceKm > settings.delivery_radius_km) {
            return { serviceable: false, fee: null, distance_km: distanceKm };
        }

        const matchingSlab = settings.delivery_slabs.find(
            (slab) => distanceKm >= slab.min_km && distanceKm <= slab.max_km
        );

        if (!matchingSlab) {
            return { serviceable: false, fee: null, distance_km: distanceKm };
        }

        return {
            serviceable: true,
            fee: matchingSlab.fee,
            distance_km: distanceKm,
        };
    }
);