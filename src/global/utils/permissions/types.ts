export type PermissionType = 'location'

export type PermissionStatus = 'granted' | 'denied' | 'undetermined'

export interface PermissionResult {
    status: PermissionStatus
    granted: boolean
}

export interface GPSLocation {
    latitude: number;
    longitude: number;
    accuracy: number | null;
}