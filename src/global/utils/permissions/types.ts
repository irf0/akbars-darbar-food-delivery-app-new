export type PermissionType = 'gallery' | 'location'

export type PermissionStatus = 'granted' | 'denied' | 'blocked'

export interface PermissionResult {
    status: PermissionStatus
    granted: boolean
}