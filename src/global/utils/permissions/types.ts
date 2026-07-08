export type PermissionType = 'location'

export type PermissionStatus = 'granted' | 'denied' | 'undetermined'

export interface PermissionResult {
    status: PermissionStatus
    granted: boolean
}