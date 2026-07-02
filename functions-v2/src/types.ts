export interface DeliverySlab {
    min_km: number;
    max_km: number;
    fee: number;
}

export interface DeliverySettings {
    latitude: number;
    longitude: number;
    delivery_radius_km: number;
    delivery_slabs: DeliverySlab[];
}

export interface ServiceabilityRequest {
    lat: number;
    lng: number;
}

export interface ServiceabilityResponse {
    serviceable: boolean;
    fee: number | null;
    distance_km: number;
}